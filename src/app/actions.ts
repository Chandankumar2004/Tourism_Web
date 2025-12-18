'use server';

import { metroGuide, type MetroGuideOutput } from '@/ai/flows/metro-guide-flow';
import { z } from 'zod';


const metroGuideSchema = z.object({
  source: z.string().min(3, 'Source station is required.'),
  destination: z.string().min(3, 'Destination station is required.'),
});

type MetroGuideState = {
  message?: string | null;
  errors?: {
    source?: string[];
    destination?: string[];
  } | null;
  result?: MetroGuideOutput | null;
}

export async function getMetroGuide(prevState: MetroGuideState, formData: FormData): Promise<MetroGuideState> {
  const validatedFields = metroGuideSchema.safeParse({
    source: formData.get('source'),
    destination: formData.get('destination'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await metroGuide(validatedFields.data);
    return {
      message: 'success',
      result,
      errors: null,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
      errors: null,
      result: null,
    };
  }
}
