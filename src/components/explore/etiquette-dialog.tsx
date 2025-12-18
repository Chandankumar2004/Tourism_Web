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
import { ShoppingBag, CheckCircle2, Hand, Shirt } from "lucide-react";

const greetingTips = [
  "A simple 'Namaste' with palms pressed together and a slight bow is a respectful traditional greeting for hello and goodbye.",
  "It is generally used when greeting elders or in formal situations. A simple 'Hello' or 'Hi' is fine among peers.",
  "When shaking hands (more common in business settings), it is customary to wait for a woman to extend her hand first."
];

const dressTips = [
    "When visiting religious sites (temples, mosques, gurdwaras), cover your shoulders, legs, and head as a sign of respect.",
    "Loose, breathable fabrics like cotton and linen are recommended, especially in hot weather.",
    "While modern clothing is common in urban areas, overly revealing outfits may attract unwanted attention.",
    "Carry a scarf or shawl; it's versatile for covering up when needed."
];

const bargainingTips = [
  "Start by offering about 50% of the asking price and negotiate from there.",
  "Always be polite and keep a smile on your face.",
  "If the vendor doesn't agree to a fair price, be prepared to walk away. They might call you back.",
  "Observe what locals are paying to get a better idea of the real price.",
  "Shopping in a group can sometimes give you more bargaining power."
];

interface EtiquetteDialogProps {
  tip: {
    icon: React.ReactNode;
    title: string;
    content: string;
  };
}

export function EtiquetteDialog({ tip }: EtiquetteDialogProps) {

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
      <AlertDialogContent className="max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-headline text-2xl flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">{tip.icon}</div>
            {tip.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-4">
             Understanding local customs will enrich your travel experience in Delhi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-6 space-y-6">
          
          <div>
            <h4 className="font-headline text-lg font-semibold text-foreground flex items-center gap-2 mb-3">
              <Hand className="w-5 h-5 text-primary" />
              Greeting Etiquette
            </h4>
             <ul className="space-y-3">
              {greetingTips.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <span className="text-foreground/90 text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-headline text-lg font-semibold text-foreground flex items-center gap-2 mb-3">
              <Shirt className="w-5 h-5 text-primary" />
              Dressing Modestly
            </h4>
             <ul className="space-y-3">
              {dressTips.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <span className="text-foreground/90 text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-lg font-semibold text-foreground flex items-center gap-2 mb-3">
              <ShoppingBag className="w-5 h-5 text-primary" />
              Bargaining Tips for Shopping
            </h4>
             <ul className="space-y-3">
              {bargainingTips.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <span className="text-foreground/90 text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
    