'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { InfoCard } from "@/components/explore/info-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ATTRACTIONS, FOODS, MARKETS, CULTURE_TOPICS, DELHI_METRO_STATIONS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import Link from 'next/link';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { TramFront, ShieldCheck, Smile, Clock } from "lucide-react";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { SafetyTipsDialog } from "@/components/explore/safety-tips-dialog";
import { EtiquetteDialog } from "@/components/explore/etiquette-dialog";

const travelTips = [
  {
    icon: <Clock className="w-6 h-6 text-primary" />,
    title: "Best Time to Visit",
    content: "October to March offers pleasant weather, ideal for sightseeing. Summers (April-June) are very hot, and the monsoon season (July-September) is humid.",
  },
  {
    icon: <TramFront className="w-6 h-6 text-primary" />,
    title: "Delhi Metro Guide",
    content: "The Delhi Metro is a fast, cheap, and air-conditioned way to travel. Get a Smart Card for easy tap-and-go access and discounts on fares.",
    href: "/metro-guide"
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: "Safety Tips",
    id: "safety-tips",
    content: "Be aware of your surroundings, especially in crowded places. Avoid displaying valuables openly. Use official transport or ride-hailing apps at night."
  },
  {
    icon: <Smile className="w-6 h-6 text-primary" />,
    title: "Local Etiquette",
    id: "local-etiquette",
    content: "Dress modestly when visiting religious sites. A simple 'Namaste' (hello) with palms pressed together is a respectful greeting. Bargaining is common in markets."
  }
];

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || 'attractions');

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">Explore Delhi's Treasures</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A deep dive into the sights, sounds, and tastes of India's vibrant capital city.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 h-auto">
              <TabsTrigger value="attractions">Attractions</TabsTrigger>
              <TabsTrigger value="food">Food & Cuisine</TabsTrigger>
              <TabsTrigger value="culture">Culture</TabsTrigger>
              <TabsTrigger value="shopping">Shopping</TabsTrigger>
              <TabsTrigger value="guide">Travel Guide</TabsTrigger>
            </TabsList>
            
            <TabsContent value="attractions" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {ATTRACTIONS.map(item => (
                  <InfoCard key={item.id} {...item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="food" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {FOODS.map(item => (
                  <InfoCard key={item.id} {...item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="culture" className="mt-8 space-y-16">
              {CULTURE_TOPICS.map((topic, index) => {
                const image = PlaceHolderImages.find(p => p.id === topic.id);
                return (
                  <div key={topic.id} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="w-full md:w-1/2">
                      {image && <Image src={image.imageUrl} alt={topic.title} data-ai-hint={image.imageHint} width={800} height={600} className="rounded-lg shadow-lg object-cover aspect-[4/3]" />}
                    </div>
                    <div className="w-full md:w-1/2">
                      <h3 className="text-2xl font-headline font-bold mb-3">{topic.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{topic.description}</p>
                    </div>
                  </div>
                )
              })}
            </TabsContent>
            
            <TabsContent value="shopping" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {MARKETS.map(item => (
                  <InfoCard key={item.id} {...item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="guide" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {travelTips.map(tip => {
                  if (tip.id === 'safety-tips') {
                    return <SafetyTipsDialog key={tip.title} tip={tip} />;
                  }
                  if (tip.id === 'local-etiquette') {
                    return <EtiquetteDialog key={tip.title} tip={tip} />;
                  }

                  const card = (
                    <Card key={tip.title} className="bg-card h-full">
                      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                        <div className="bg-primary/10 p-3 rounded-full">{tip.icon}</div>
                        <CardTitle className="text-lg font-headline">{tip.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{tip.content}</p>
                      </CardContent>
                    </Card>
                  );

                  if (tip.href) {
                    return (
                      <Link href={tip.href} key={tip.title} className="block hover:shadow-lg transition-shadow rounded-lg">
                        {card}
                      </Link>
                    )
                  }
                  return card;
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
