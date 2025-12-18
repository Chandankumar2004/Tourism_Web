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
import { Card, CardContent, CardHeader, CardTitle, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/card";
import { ShoppingBag, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

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
  const namasteImg = PlaceHolderImages.find(p => p.id === 'etiquette-namaste');
  const dressImages = PlaceHolderImages.filter(p => p.id.startsWith('etiquette-dress-'));

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
      <AlertDialogContent className="max-w-3xl">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {namasteImg && (
              <div className="space-y-3">
                <h4 className="font-headline text-lg font-semibold text-foreground">The 'Namaste' Greeting</h4>
                <Image src={namasteImg.imageUrl} alt={namasteImg.description} data-ai-hint={namasteImg.imageHint} width={400} height={300} className="rounded-lg shadow-md object-cover" />
                <p className="text-sm text-muted-foreground">A simple 'Namaste' with palms pressed together and a slight bow is a respectful traditional greeting for both hello and goodbye.</p>
              </div>
            )}
            <div className="space-y-3">
                <h4 className="font-headline text-lg font-semibold text-foreground">Dressing Modestly</h4>
                 <Carousel className="w-full max-w-sm mx-auto">
                  <CarouselContent>
                    {dressImages.map((image) => (
                      <CarouselItem key={image.id}>
                        <div className="p-1">
                          <Card className="overflow-hidden">
                            <CardContent className="flex aspect-square items-center justify-center p-0">
                               <Image src={image.imageUrl} alt={image.description} data-ai-hint={image.imageHint} width={400} height={400} className="rounded-lg shadow-md object-cover w-full h-full" />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                <p className="text-sm text-muted-foreground text-center">Especially when visiting religious sites, it's respectful to cover your shoulders and knees. Loose-fitting clothing is also more comfortable in the climate.</p>
              </div>
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
    