import Link from "next/link";
import { ArrowRight, Landmark, UtensilsCrossed, ShoppingBag, Palette } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { RecommendationTool } from "@/components/home/recommendation-tool";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const highlights = [
  {
    icon: <Landmark className="w-8 h-8 text-primary" />,
    title: "Heritage",
    description: "Explore majestic forts, ancient tombs, and colonial architecture.",
    href: "/explore?tab=attractions",
  },
  {
    icon: <Palette className="w-8 h-8 text-primary" />,
    title: "Culture",
    description: "Immerse yourself in a vibrant mix of traditions, arts, and festivals.",
    href: "/explore?tab=culture",
  },
  {
    icon: <UtensilsCrossed className="w-8 h-8 text-primary" />,
    title: "Food",
    description: "Savor a culinary journey from spicy street food to fine dining.",
    href: "/explore?tab=food",
  },
  {
    icon: <ShoppingBag className="w-8 h-8 text-primary" />,
    title: "Markets",
    description: "Get lost in bustling bazaars and modern shopping complexes.",
    href: "/explore?tab=shopping",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        
        <section id="discover" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 text-foreground">
                The Heart of India
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                As the capital of India, New Delhi is a sprawling metropolis that serves as the nation's political, historical, and cultural epicenter. It's a city where ancient history and modernity coexist, offering a unique tapestry of experiences for every traveler.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {highlights.map((item) => (
                <Link key={item.title} href={item.href}>
                  <Card className="text-center bg-card border-border/50 hover:shadow-lg transition-shadow h-full">
                    <CardHeader>
                      <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                        {item.icon}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="font-headline text-xl mb-2">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 text-foreground">
                Plan Your Perfect Trip
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let our AI-powered guide craft a personalized itinerary for your Delhi adventure. Just tell us when you're visiting and what you love to do.
              </p>
            </div>
            <RecommendationTool />
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
             <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 text-foreground">
                Ready to Explore?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Dive deeper into what Delhi has to offer. From iconic landmarks to hidden gems, your journey starts here.
              </p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/explore">
                  Discover Delhi's Treasures <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
