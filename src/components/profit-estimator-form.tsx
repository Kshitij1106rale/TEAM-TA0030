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
import { Loader2, BrainCircuit, BarChart, TrendingUp, ListChecks, AlertTriangle, BadgeCheck } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cropTypes } from '@/lib/data';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useTranslation, type Language } from '@/providers/i18n-provider';

const formSchema = z.object({
  cropType: z.string().min(1, 'Crop type is required.'),
  productionCostPerUnit: z.coerce.number().positive('Cost must be a positive number.'),
  expectedYield: z.coerce.number().positive('Yield must be a positive number.'),
  currentMarketData: z.string().min(10, 'Please provide some details about the market.'),
});

export function ProfitEstimatorForm() {
    const { t, language } = useTranslation();
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

        const langMap: Record<Language, string> = {
            en: 'English',
            hi: 'Hindi',
            mr: 'Marathi',
        };

        try {
            const response = await estimateProfit({
                ...values,
                language: langMap[language]
            });
            setResult(response);
        } catch (e) {
            setError(t('profitEstimatorForm.errorEstimating'));
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

    const formatNumber = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
        }).format(value);
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('profitEstimatorForm.title')}</CardTitle>
            <CardDescription>{t('profitEstimatorForm.description')}</CardDescription>
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
                        <FormLabel>{t('profitEstimatorForm.cropTypeLabel')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('profitEstimatorForm.cropTypePlaceholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cropTypes.map(crop => <SelectItem key={crop} value={crop}>{t(`crops.${crop}`)}</SelectItem>)}
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
                        <FormLabel>{t('profitEstimatorForm.costLabel')}</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder={t('profitEstimatorForm.costPlaceholder')} {...field} value={field.value ?? ''} />
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
                        <FormLabel>{t('profitEstimatorForm.yieldLabel')}</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder={t('profitEstimatorForm.yieldPlaceholder')} {...field} value={field.value ?? ''} />
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
                      <FormLabel>{t('profitEstimatorForm.marketDataLabel')}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={t('profitEstimatorForm.marketDataPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
                  {t('profitEstimatorForm.estimateButton')}
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
                <p className="mt-4 font-semibold text-lg">{t('profitEstimatorForm.calculatingTitle')}</p>
                <p className="text-muted-foreground">{t('profitEstimatorForm.calculatingDescription')}</p>
              </CardContent>
            </Card>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>{t('profitEstimatorForm.estimationFailedTitle')}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart /> {t('profitEstimatorForm.analysisTitle')}</CardTitle>
                <CardDescription>{t('profitEstimatorForm.analysisDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                        <h4 className="text-sm font-medium text-muted-foreground">{t('profitEstimatorForm.estimatedProfit')}</h4>
                        <div className="text-3xl font-bold text-primary">{formatNumber(result.estimatedProfit)}</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2"><TrendingUp className="h-4 w-4"/>{t('profitEstimatorForm.profitOutlook')}</h4>
                        <div className="text-3xl font-bold text-center">
                            <Badge variant="outline" className={`text-lg ${outlookColors[result.profitOutlook.toLowerCase()]}`}>
                                {t(`profitEstimatorForm.outlooks.${result.profitOutlook.toLowerCase()}`)}
                            </Badge>
                        </div>
                    </div>
                </div>
                
                <Separator />

                <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><ListChecks className="h-5 w-5"/>{t('profitEstimatorForm.recommendations')}</h4>
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
                    <p className="mt-4 font-semibold text-lg text-muted-foreground">{t('profitEstimatorForm.awaitingTitle')}</p>
                    <p className="text-muted-foreground">{t('profitEstimatorForm.awaitingDescription')}</p>
                </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
}
