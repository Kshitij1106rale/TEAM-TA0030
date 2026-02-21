'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { estimateProfit, type ProfitEstimationOutput } from '@/ai/flows/profit-estimation-flow';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Loader2, BrainCircuit, BarChart, TrendingUp, IndianRupee, ListChecks, AlertTriangle, BadgeCheck } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cropTypes } from '@/lib/data';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

const formSchema = z.object({
  cropType: z.string().min(1, 'Crop type is required.'),
  productionCostPerUnit: z.coerce.number().positive('Cost must be a positive number.'),
  expectedYield: z.coerce.number().positive('Yield must be a positive number.'),
  currentMarketData: z.string().min(10, 'Please provide some details about the market.'),
});

export function ProfitEstimatorForm() {
    const [result, setResult] = useState<ProfitEstimationOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cropType: '',
            productionCostPerUnit: undefined,
            expectedYield: undefined,
            currentMarketData: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await estimateProfit(values);
            setResult(response);
        } catch (e) {
            setError('An error occurred while estimating profit. Please try again.');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };
    
    const outlookColors: { [key: string]: string } = {
        strong: 'bg-green-400/20 text-green-600 border-green-400/30',
        moderate: 'bg-yellow-400/20 text-yellow-600 border-yellow-400/30',
        challenging: 'bg-red-400/20 text-red-600 border-red-400/30',
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Enter Crop Details</CardTitle>
            <CardDescription>Provide the following details to estimate your potential profit.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cropType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Crop Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a crop" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cropTypes.map(crop => <SelectItem key={crop} value={crop}>{crop}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="productionCostPerUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cost per Unit (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 1500" {...field} value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                    control={form.control}
                    name="expectedYield"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Expected Yield (in Quintals)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g., 50" {...field} value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                  control={form.control}
                  name="currentMarketData"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Market Data</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., 'Current mandi price is around ₹2400/quintal, demand is high due to festive season...'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
                  Estimate Profit
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
                <p className="mt-4 font-semibold text-lg">Calculating Profit...</p>
                <p className="text-muted-foreground">Our AI is running the numbers. Please wait a moment.</p>
              </CardContent>
            </Card>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Estimation Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart /> Profit Analysis</CardTitle>
                <CardDescription>AI-powered financial forecast for your crop.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2"><IndianRupee className="h-4 w-4"/>Estimated Profit</h4>
                        <p className="text-3xl font-bold text-primary">₹{result.estimatedProfit.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2"><TrendingUp className="h-4 w-4"/>Profit Outlook</h4>
                        <div className="text-3xl font-bold">
                            <Badge variant="outline" className={`text-lg ${outlookColors[result.profitOutlook.toLowerCase()]}`}>
                                {result.profitOutlook}
                            </Badge>
                        </div>
                    </div>
                </div>
                
                <Separator />

                <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><ListChecks className="h-5 w-5"/>Recommendations</h4>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                        {result.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                    </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {!isLoading && !result && !error && (
            <Card className="flex flex-col items-center justify-center h-full border-dashed">
                <CardContent className="text-center p-6">
                    <BadgeCheck className="h-16 w-16 text-muted-foreground/50" />
                    <p className="mt-4 font-semibold text-lg text-muted-foreground">Awaiting Estimation</p>
                    <p className="text-muted-foreground">Your profit forecast will appear here.</p>
                </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
}
