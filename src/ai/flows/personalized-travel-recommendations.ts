// src/ai/flows/personalized-travel-recommendations.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized travel recommendations for New Delhi.
 *
 * The flow takes into account the time of year and current events to suggest places to visit, cuisines to explore, and experiences to enjoy.
 *
 * @exports {personalizedTravelRecommendations} - An async function that returns personalized travel recommendations.
 * @exports {PersonalizedTravelRecommendationsInput} - The input type for the personalizedTravelRecommendations function.
 * @exports {PersonalizedTravelRecommendationsOutput} - The output type for the personalizedTravelRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedTravelRecommendationsInputSchema = z.object({
  month: z.string().describe('The month of the year for the planned visit (e.g., January, February).'),
  interests: z.string().describe('A comma-separated list of the tourist\u2019s interests (e.g., history, food, shopping).'),
});
export type PersonalizedTravelRecommendationsInput = z.infer<typeof PersonalizedTravelRecommendationsInputSchema>;

const PersonalizedTravelRecommendationsOutputSchema = z.object({
  recommendations: z.string().describe('A list of personalized travel recommendations for New Delhi, formatted as bullet points.'),
});
export type PersonalizedTravelRecommendationsOutput = z.infer<typeof PersonalizedTravelRecommendationsOutputSchema>;

export async function personalizedTravelRecommendations(
  input: PersonalizedTravelRecommendationsInput
): Promise<PersonalizedTravelRecommendationsOutput> {
  return personalizedTravelRecommendationsFlow(input);
}

const personalizedTravelRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedTravelRecommendationsPrompt',
  input: {schema: PersonalizedTravelRecommendationsInputSchema},
  output: {schema: PersonalizedTravelRecommendationsOutputSchema},
  prompt: `You are an expert travel guide for New Delhi, India. A tourist is planning a visit and wants personalized recommendations based on the time of year and their interests.

  It is currently {{month}}.

  The tourist is interested in: {{interests}}

  Provide a detailed list of recommendations, including specific places to visit, cuisines to explore, and experiences to enjoy. Consider any relevant holidays, festivals, or events happening during this time of year. Format the output as a list of bullet points (using markdown).
`,
});

const personalizedTravelRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedTravelRecommendationsFlow',
    inputSchema: PersonalizedTravelRecommendationsInputSchema,
    outputSchema: PersonalizedTravelRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedTravelRecommendationsPrompt(input);
    return output!;
  }
);
