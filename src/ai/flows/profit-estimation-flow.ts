'use server';
/**
 * @fileOverview A Genkit flow for estimating profit for farmers.
 *
 * - estimateProfit - A function that handles the profit estimation process.
 * - ProfitEstimationInput - The input type for the estimateProfit function.
 * - ProfitEstimationOutput - The return type for the estimateProfit function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const ProfitEstimationInputSchema = z.object({
  cropType: z.string().describe('The type of crop for which to estimate profit (e.g., Wheat, Rice, Corn).'),
  productionCostPerUnit: z.number().positive().describe('The estimated cost to produce one unit of the crop.'),
  expectedYield: z.number().positive().describe('The expected total yield of the crop in units.'),
  currentMarketData: z.string().describe('A detailed description of current market conditions relevant to the crop, including prices, demand, and trends.'),
});
export type ProfitEstimationInput = z.infer<typeof ProfitEstimationInputSchema>;

// Output Schema
const ProfitEstimationOutputSchema = z.object({
  estimatedProfit: z.number().describe('The calculated net profit estimate for the crop.'),
  profitOutlook: z.string().describe('A professional assessment of the profit outlook (e.g., "Strong", "Moderate", "Challenging").'),
  recommendations: z.array(z.string()).describe('A list of actionable recommendations to optimize profitability, presented as structured bullet points.'),
});
export type ProfitEstimationOutput = z.infer<typeof ProfitEstimationOutputSchema>;

// Wrapper function to call the flow
export async function estimateProfit(input: ProfitEstimationInput): Promise<ProfitEstimationOutput> {
  return profitEstimationFlow(input);
}

// Genkit Prompt Definition
const profitEstimationPrompt = ai.definePrompt({
  name: 'profitEstimationPrompt',
  input: {schema: ProfitEstimationInputSchema},
  output: {schema: ProfitEstimationOutputSchema},
  prompt: `You are an expert agricultural financial analyst specializing in crop profitability.
Your task is to provide a comprehensive profit estimate and strategic recommendations for farmers based on the provided information.

IMPORTANT INSTRUCTIONS:
- Generate industry-level, executive, and professional content.
- Keep content concise but powerful.
- Avoid student-style language.
- Use structured bullet points for recommendations.
- Ensure clarity and a strong business tone.
- The estimatedProfit should be a precise numerical value.

Analyze the following data:
Crop Type: {{{cropType}}}
Production Cost Per Unit: {{{productionCostPerUnit}}}
Expected Yield: {{{expectedYield}}}
Current Market Data: {{{currentMarketData}}}

Based on this information, calculate the estimated net profit and provide a professional profit outlook, along with actionable recommendations to optimize profitability.
`,
});

// Genkit Flow Definition
const profitEstimationFlow = ai.defineFlow(
  {
    name: 'profitEstimationFlow',
    inputSchema: ProfitEstimationInputSchema,
    outputSchema: ProfitEstimationOutputSchema,
  },
  async (input) => {
    const {output} = await profitEstimationPrompt(input);
    if (!output) {
      throw new Error("Failed to generate profit estimation output.");
    }
    return output;
  }
);
