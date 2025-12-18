'use client';

import { useActionState, useRef, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getMetroGuide } from '@/app/actions';
import { DELHI_METRO_STATIONS } from '@/lib/constants';
import { Terminal, TramFront, MapPin, IndianRupee } from 'lucide-react';
import type { MetroGuideOutput } from '@/ai/flows/metro-guide-flow';

const initialState: {
  message: string | null;
  errors: { source?: string[]; destination?: string[] } | null;
  result: MetroGuideOutput | null;
} = {
  message: null,
  errors: null,
  result: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? 'Finding Route...' : 'Find Route'}
    </Button>
  );
}

export default function MetroGuidePage() {
  const [state, formAction] = useActionState(getMetroGuide, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === 'success') {
      // Keep form values after successful submission
    }
  }, [state.message]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">Delhi Metro Guide</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Plan your journey and discover tourist spots along the way.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Route Planner</CardTitle>
                <CardDescription>Select your start and end stations to get started.</CardDescription>
              </CardHeader>
              <CardContent>
                <form ref={formRef} action={formAction} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="source">Source Station</Label>
                      <Select name="source" required>
                        <SelectTrigger id="source">
                          <SelectValue placeholder="Select a station" />
                        </SelectTrigger>
                        <SelectContent>
                          {DELHI_METRO_STATIONS.map((station) => (
                            <SelectItem key={station} value={station}>
                              {station}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {state.errors?.source && <p className="text-sm text-destructive">{state.errors.source[0]}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination Station</Label>
                       <Select name="destination" required>
                        <SelectTrigger id="destination">
                          <SelectValue placeholder="Select a station" />
                        </SelectTrigger>
                        <SelectContent>
                          {DELHI_METRO_STATIONS.map((station) => (
                            <SelectItem key={station} value={station}>
                              {station}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {state.errors?.destination && <p className="text-sm text-destructive">{state.errors.destination[0]}</p>}
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

                {state.result && (
                  <div className="mt-8 space-y-8">
                    <Card className="bg-secondary/50">
                      <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><IndianRupee /> Estimated Fare</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold text-primary">{state.result.fare}</p>
                      </CardContent>
                    </Card>

                    <div>
                      <h3 className="text-2xl font-headline font-bold mb-4">Tourist Spots On Your Route</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {state.result.touristPlaces.map((place) => (
                          <Card key={place.name}>
                            <CardHeader>
                              <CardTitle className="font-headline">{place.name}</CardTitle>
                              <CardDescription className="flex items-center gap-2 pt-1">
                                <TramFront className="w-4 h-4 text-muted-foreground" />
                                Nearest Station: {place.nearestStation}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground">{place.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
