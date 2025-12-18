// src/ai/flows/personalized-travel-recommendations.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized travel recommendations for New Delhi.
 *
 * The flow takes into account the time of year and current events to suggest places to visit, cuisines to explore, and experiences to enjoy.
 *
 * @exports {personalizedTravelRecommendations} - An async function that returns personalized travel recommendations.
 * @exports {PersonalizedTravelRecommendationsInput} - The input type for the personalizedTravelRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedTravelRecommendationsInputSchema = z.object({
  month: z.string().describe('The month of the year for the planned visit (e.g., January, February).'),
  interests: z.string().describe('A comma-separated list of the tourist’s interests (e.g., history, food, shopping).'),
});
export type PersonalizedTravelRecommendationsInput = z.infer<typeof PersonalizedTravelRecommendationsInputSchema>;

export async function personalizedTravelRecommendations(
  input: PersonalizedTravelRecommendationsInput
): Promise<string> {
  const result = await personalizedTravelRecommendationsFlow(input);
  return result;
}

const personalizedTravelRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedTravelRecommendationsPrompt',
  input: {schema: PersonalizedTravelRecommendationsInputSchema},
  prompt: `You are an expert travel guide for New Delhi, India. A tourist is planning a visit and wants personalized recommendations based on the time of year and their interests.

  It is currently {{month}}.

  The tourist is interested in: {{interests}}

  Provide a concise list of 3-4 recommendations, including specific places to visit, cuisines to explore, and experiences to enjoy. Consider any relevant holidays, festivals, or events happening during this time of year. Format the output as a markdown list of bullet points.
`,
});

const personalizedTravelRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedTravelRecommendationsFlow',
    inputSchema: PersonalizedTravelRecommendationsInputSchema,
    outputSchema: z.string(),
  },
  async input => {
    const llmResponse = await personalizedTravelRecommendationsPrompt(input);
    return llmResponse.text;
  }
);
