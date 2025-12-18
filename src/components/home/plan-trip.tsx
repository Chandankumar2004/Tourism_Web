'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getTripRecommendations } from '@/app/actions';
import { MONTHS } from '@/lib/constants';
import { Lightbulb, Terminal, CheckCircle2 } from 'lucide-react';
import type { PlanTripOutput } from '@/ai/flows/plan-trip-flow';

const initialState: {
  message: string | null;
  errors: { month?: string[]; interests?: string[] } | null;
  result: PlanTripOutput | null;
} = {
  message: null,
  errors: null,
  result: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? 'Generating...' : 'Get Recommendations'}
    </Button>
  );
}

export function PlanTrip() {
  const [state, formAction] = useActionState(getTripRecommendations, initialState);

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl md:text-4xl font-headline flex items-center justify-center gap-3">
          <Lightbulb className="w-8 h-8 text-primary" />
          Plan Your Perfect Trip
        </CardTitle>
        <CardDescription className="text-lg">
          Tell us your interests, and we'll generate a custom itinerary for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="month">Month of Visit</Label>
              <Select name="month" required>
                <SelectTrigger id="month">
                  <SelectValue placeholder="Select a month" />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.month && <p className="text-sm text-destructive">{state.errors.month[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="interests">Your Interests</Label>
              <Input
                id="interests"
                name="interests"
                placeholder="e.g., history, food, photography"
                required
              />
              {state.errors?.interests && <p className="text-sm text-destructive">{state.errors.interests[0]}</p>}
            </div>
          </div>
          <div className="text-center">
            <SubmitButton />
          </div>
        </form>

        {state.message && state.message !== 'success' && (
          <Alert variant="destructive" className="mt-6">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        {state.result && state.result.recommendations && (
          <div className="mt-8">
            <h3 className="text-2xl font-headline font-bold mb-4 text-center">Your Personalized Recommendations</h3>
            <ul className="space-y-3">
              {state.result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-background rounded-md border">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <span className="text-foreground/90">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
