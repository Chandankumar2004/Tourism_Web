'use server';

import { personalizedTravelRecommendations } from '@/ai/flows/personalized-travel-recommendations';
import { z } from 'zod';

const recommendationSchema = z.object({
  month: z.string().min(1, 'Month is required.'),
  interests: z.string().min(3, 'Please list at least one interest.'),
});

type State = {
  message?: string | null;
  errors?: {
    month?: string[];
    interests?: string[];
  } | null;
  recommendations?: string | null;
}

export async function getTravelRecommendations(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = recommendationSchema.safeParse({
    month: formData.get('month'),
    interests: formData.get('interests'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await personalizedTravelRecommendations(validatedFields.data);
    return {
      message: 'success',
      recommendations: result.recommendations,
      errors: null,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred while generating recommendations. Please try again later.',
      errors: null,
      recommendations: null,
    };
  }
}
