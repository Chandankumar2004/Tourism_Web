'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing information about the Delhi Metro.
 *
 * @exports {metroGuide} - An async function that returns tourist spots and fare estimates.
 * @exports {MetroGuideInput} - The input type for the metroGuide function.
 * @exports {MetroGuideOutput} - The output type for the metroGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MetroGuideInputSchema = z.object({
  source: z.string().describe('The starting metro station.'),
  destination: z.string().describe('The destination metro station.'),
});
export type MetroGuideInput = z.infer<typeof MetroGuideInputSchema>;

const TouristPlaceSchema = z.object({
  name: z.string().describe('The name of the tourist place.'),
  nearestStation: z.string().describe('The nearest metro station to this place.'),
  description: z.string().describe('A brief description of the tourist place.'),
});

const MetroGuideOutputSchema = z.object({
  fare: z.string().describe('The estimated metro fare in Indian Rupees (₹).'),
  touristPlaces: z.array(TouristPlaceSchema).describe('A list of tourist places between or near the source and destination stations.'),
});
export type MetroGuideOutput = z.infer<typeof MetroGuideOutputSchema>;

export async function metroGuide(input: MetroGuideInput): Promise<MetroGuideOutput> {
  return metroGuideFlow(input);
}

const metroGuidePrompt = ai.definePrompt({
  name: 'metroGuidePrompt',
  input: {schema: MetroGuideInputSchema},
  output: {schema: MetroGuideOutputSchema},
  prompt: `You are a Delhi Metro travel assistant. A user wants to travel from '{{source}}' to '{{destination}}'.

  1.  Identify major tourist attractions that fall on or very close to the metro route between these two stations. Provide at least 3-4 places.
  2.  For each attraction, provide the name, the closest metro station on their route, and a short, compelling description.
  3.  Provide a realistic estimated metro fare in Indian Rupees (e.g., "₹40 - ₹50").

  Please provide a helpful and accurate response.
`,
});

const metroGuideFlow = ai.defineFlow(
  {
    name: 'metroGuideFlow',
    inputSchema: MetroGuideInputSchema,
    outputSchema: MetroGuideOutputSchema,
  },
  async input => {
    const {output} = await metroGuidePrompt(input);
    return output!;
  }
);
