'use server';
/**
 * @fileOverview A trip planning AI agent for Delhi.
 *
 * - planTrip - A function that handles the trip planning process.
 * - PlanTripInput - The input type for the planTrip function.
 * - PlanTripOutput - The return type for the planTrip function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PlanTripInputSchema = z.object({
  month: z.string().describe('The month of the planned visit.'),
  interests: z.string().describe('The user\'s interests for the trip.'),
});
export type PlanTripInput = z.infer<typeof PlanTripInputSchema>;

const PlanTripOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of 5 to 6 trip recommendation points.'),
});
export type PlanTripOutput = z.infer<typeof PlanTripOutputSchema>;

export async function planTrip(input: PlanTripInput): Promise<PlanTripOutput> {
  return planTripFlow(input);
}

const planTripPrompt = ai.definePrompt({
  name: 'planTripPrompt',
  input: {schema: PlanTripInputSchema},
  output: {schema: PlanTripOutputSchema},
  prompt: `You are a Delhi travel expert. A user wants to plan a trip.

User's Interests: {{interests}}
Month of Visit: {{month}}

Based on this, provide a travel plan with 5 to 6 specific, actionable recommendation points. Each point should be a concise sentence.
`,
});

const planTripFlow = ai.defineFlow(
  {
    name: 'planTripFlow',
    inputSchema: PlanTripInputSchema,
    outputSchema: PlanTripOutputSchema,
  },
  async input => {
    const {output} = await planTripPrompt(input);
    return output!;
  }
);
