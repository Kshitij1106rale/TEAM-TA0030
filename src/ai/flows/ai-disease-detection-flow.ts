'use server';
/**
 * @fileOverview An AI agent for detecting crop diseases from leaf images.
 *
 * - detectDisease - A function that handles the disease detection process.
 * - LeafImageInput - The input type for the detectDisease function.
 * - DiseaseDetectionOutput - The return type for the detectDisease function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const LeafImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a crop leaf, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z
    .string()
    .optional()
    .describe('An optional description of the plant or observed symptoms.'),
  language: z.string().describe('The language for the output (e.g., "English", "Hindi", "Marathi").'),
});
export type LeafImageInput = z.infer<typeof LeafImageInputSchema>;

const DiseaseDetectionOutputSchema = z.object({
  diseaseDetected: z
    .boolean()
    .describe('True if a disease or abnormality is detected, false otherwise.'),
  diseaseName: z
    .string()
    .describe('The name of the detected disease, or "Healthy" if no disease is found.'),
  symptoms: z
    .array(z.string())
    .describe('A list of symptoms observed in the image or description.'),
  severity: z
    .enum(['low', 'medium', 'high', 'N/A'])
    .describe('The severity level of the detected disease, or "N/A" if healthy.'),
  recommendations: z
    .string()
    .describe('Detailed recommendations for treatment and prevention, or advice for maintaining health if no disease is detected.'),
  confidence: z
    .enum(['low', 'medium', 'high'])
    .describe("The model's confidence in its detection and diagnosis."),
});
export type DiseaseDetectionOutput = z.infer<typeof DiseaseDetectionOutputSchema>;

export async function detectDisease(input: LeafImageInput): Promise<DiseaseDetectionOutput> {
  return aiDiseaseDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDiseaseDetectionPrompt',
  input: { schema: LeafImageInputSchema },
  output: { schema: DiseaseDetectionOutputSchema },
  prompt: `You are an expert agricultural pathologist for the AgriPredict platform. Your task is to analyze an image of a crop leaf and an optional farmer's description to detect potential diseases or abnormalities. Provide a professional, concise, and accurate diagnosis in the requested language: {{{language}}}.

Instructions:
1. Carefully examine the provided leaf image and description.
2. Determine if a disease is present. If not, conclude the leaf is healthy.
3. If a disease is detected, identify its name, list visible symptoms, assess its severity, and provide practical recommendations for treatment and prevention. All text output (diseaseName, symptoms, recommendations) MUST be in {{{language}}}.
4. If no disease is detected, provide general advice for maintaining plant health, in {{{language}}}.
5. The 'severity' and 'confidence' fields must be one of the following English values: 'low', 'medium', 'high', 'N/A'. Do not translate these specific values.
6. Use structured bullet points for symptoms and recommendations where appropriate.

Description from farmer (if provided): {{{description}}}
Photo of crop leaf: {{media url=photoDataUri}}`,
});

const aiDiseaseDetectionFlow = ai.defineFlow(
  {
    name: 'aiDiseaseDetectionFlow',
    inputSchema: LeafImageInputSchema,
    outputSchema: DiseaseDetectionOutputSchema,
    // Using 'googleai/gemini-2.5-flash-image' for multimodal input (text + image)
    model: 'googleai/gemini-2.5-flash-image',
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
