'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogCancel
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const safetyPoints = [
  "Be aware of your surroundings, especially in crowded places.",
  "Avoid displaying expensive jewelry, electronics, or large amounts of cash openly.",
  "Use official, pre-paid taxis or trusted ride-hailing apps like Uber or Ola, especially at night.",
  "Keep your belongings secure and never leave them unattended.",
  "Be cautious of overly friendly strangers offering unsolicited help or deals that seem too good to be true.",
  "Always drink bottled or filtered water. Avoid tap water.",
  "When visiting religious sites, dress modestly to show respect.",
  "Keep digital and physical copies of your important documents (passport, visa) separate.",
  "Save emergency contact numbers, including your local embassy and local police.",
];

interface SafetyTipsDialogProps {
  tip: {
    icon: React.ReactNode;
    title: string;
    content: string;
  };
}

export function SafetyTipsDialog({ tip }: SafetyTipsDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="cursor-pointer block hover:shadow-lg transition-shadow rounded-lg">
          <Card key={tip.title} className="bg-card h-full">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
              <div className="bg-primary/10 p-3 rounded-full">{tip.icon}</div>
              <CardTitle className="text-lg font-headline">{tip.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{tip.content}</p>
            </CardContent>
          </Card>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-headline text-2xl flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">{tip.icon}</div>
            {tip.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-4">
             A few key tips to ensure you have a safe and enjoyable visit to Delhi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-6">
          <ul className="space-y-3">
            {safetyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                <span className="text-foreground/90">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
