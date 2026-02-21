'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { detectDisease, type DiseaseDetectionOutput } from '@/ai/flows/ai-disease-detection-flow';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Loader2, Upload, Leaf, ShieldCheck, Microscope, Thermometer, Info, BadgeCheck, BarChart, AlertTriangle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

const formSchema = z.object({
  image: z.any().refine((files) => files?.length > 0, 'Leaf image is required.'),
  description: z.string().optional(),
});

export function DiseaseDetectionForm() {
    const [result, setResult] = useState<DiseaseDetectionOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: '',
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue('image', e.target.files);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        const file = values.image[0];
        if (!file) {
            setError('No file selected.');
            setIsLoading(false);
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const photoDataUri = reader.result as string;
            try {
                const response = await detectDisease({
                    photoDataUri,
                    description: values.description,
                });
                setResult(response);
            } catch (e) {
                setError('An error occurred while analyzing the image. Please try again.');
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        reader.onerror = () => {
            setError('Failed to read the image file.');
            setIsLoading(false);
        };
    };

    const severityColors: {[key: string]: string} = {
        low: 'bg-yellow-400/20 text-yellow-600 border-yellow-400/30',
        medium: 'bg-orange-400/20 text-orange-600 border-orange-400/30',
        high: 'bg-red-400/20 text-red-600 border-red-400/30',
        'N/A': 'bg-green-400/20 text-green-600 border-green-400/30'
    };
    
    const confidenceColors: {[key: string]: string} = {
        low: 'bg-yellow-400/20 text-yellow-600 border-yellow-400/30',
        medium: 'bg-orange-400/20 text-orange-600 border-orange-400/30',
        high: 'bg-green-400/20 text-green-600 border-green-400/30'
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Submit for Analysis</CardTitle>
            <CardDescription>Upload a clear image of the affected leaf.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Leaf Image</FormLabel>
                      <FormControl>
                        <div className="relative flex justify-center items-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                          <Input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleImageChange}
                          />
                          {preview ? (
                            <Image src={preview} alt="Leaf preview" layout="fill" objectFit="contain" className="rounded-lg p-2" />
                          ) : (
                            <div className="text-center">
                              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                              <p className="mt-2 text-sm text-muted-foreground">Click or drag file to upload</p>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Optional Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., 'Yellow spots appeared 3 days ago on lower leaves...'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Microscope className="mr-2 h-4 w-4" />}
                  Analyze Leaf
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
        
        <div className="space-y-6">
          {isLoading && (
            <Card className="flex flex-col items-center justify-center h-full">
              <CardContent className="text-center p-6">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <p className="mt-4 font-semibold text-lg">Analyzing Image...</p>
                <p className="text-muted-foreground">Our AI is inspecting the leaf. Please wait a moment.</p>
              </CardContent>
            </Card>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Analysis Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {result.diseaseDetected ? <Leaf className="text-destructive" /> : <ShieldCheck className="text-primary" />}
                    <span>Analysis Result</span>
                </CardTitle>
                <CardDescription>AI-powered diagnosis and recommendations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg">{result.diseaseName}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                        {result.severity !== 'N/A' && <Badge variant="outline" className={severityColors[result.severity.toLowerCase()]}>Severity: {result.severity}</Badge>}
                        <Badge variant="outline" className={confidenceColors[result.confidence.toLowerCase()]}>Confidence: {result.confidence}</Badge>
                    </div>
                  </div>

                {result.symptoms && result.symptoms.length > 0 && (
                    <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-2"><Thermometer className="h-4 w-4"/>Symptoms</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {result.symptoms.map((symptom, i) => <li key={i}>{symptom}</li>)}
                        </ul>
                    </div>
                )}
                
                <Separator />

                {result.recommendations && (
                    <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-2"><Info className="h-4 w-4"/>Recommendations</h4>
                        <div className="text-sm text-muted-foreground prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: result.recommendations.replace(/\n/g, '<br />') }} />
                    </div>
                )}
              </CardContent>
            </Card>
          )}

          {!isLoading && !result && !error && (
            <Card className="flex flex-col items-center justify-center h-full border-dashed">
                <CardContent className="text-center p-6">
                    <BadgeCheck className="h-16 w-16 text-muted-foreground/50" />
                    <p className="mt-4 font-semibold text-lg text-muted-foreground">Awaiting Analysis</p>
                    <p className="text-muted-foreground">Your diagnosis report will appear here.</p>
                </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
}
