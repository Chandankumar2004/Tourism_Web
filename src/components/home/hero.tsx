import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Compass } from "lucide-react";

export function Hero() {
  const indiaGateImg = PlaceHolderImages.find(p => p.id === 'hero-india-gate');
  const rashtrapatiBhavanImg = PlaceHolderImages.find(p => p.id === 'hero-rashtrapati-bhavan');
  const skylineImg = PlaceHolderImages.find(p => p.id === 'hero-skyline');

  return (
    <section className="relative h-[80vh] min-h-[500px] max-h-[700px] w-full flex items-center justify-center text-white">
      <div className="absolute inset-0 z-0">
        {indiaGateImg && (
          <Image
            src={indiaGateImg.imageUrl}
            alt={indiaGateImg.description}
            data-ai-hint={indiaGateImg.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      <div className="relative z-20 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-tight"
          style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
          New Delhi
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
          Where History Lives and the Nation Breathes
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="#discover">
              Discover Delhi <Compass className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black">
            <Link href="/explore">
              Explore Heritage <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
