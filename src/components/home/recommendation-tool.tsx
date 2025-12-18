"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { getTravelRecommendations } from "@/app/actions";
import { MONTHS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const initialState = {
  message: null,
  errors: null,
  recommendations: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? "Generating..." : "Get Recommendations"}
    </Button>
  );
}

export function RecommendationTool() {
  const [state, formAction] = useFormState(getTravelRecommendations, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === "success") {
      formRef.current?.reset();
    }
  }, [state.message]);

  return (
    <Card className="max-w-4xl mx-auto border-border/50">
      <CardContent className="p-6">
        <form ref={formRef} action={formAction} className="space-y-6">
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
                placeholder="e.g., history, food, shopping"
                required
              />
              {state.errors?.interests && <p className="text-sm text-destructive">{state.errors.interests[0]}</p>}
            </div>
          </div>
          <SubmitButton />
        </form>

        {state.message && state.message !== 'success' && (
          <Alert variant="destructive" className="mt-6">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}
        
        {state.recommendations && (
           <div className="mt-8">
             <Card className="bg-background">
               <CardHeader>
                 <CardTitle className="font-headline">Your Personalized Delhi Plan</CardTitle>
                 <CardDescription>Based on your interests for the selected month.</CardDescription>
               </CardHeader>
               <CardContent>
                 <p className="text-foreground/90 leading-relaxed">{state.recommendations}</p>
               </CardContent>
             </Card>
           </div>
        )}
      </CardContent>
    </Card>
  );
}
