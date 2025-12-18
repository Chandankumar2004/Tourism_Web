import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">About Delhi Discoveries</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Your modern guide to India's timeless capital.
              </p>
            </div>
            
            <div className="prose prose-lg dark:prose-invert mx-auto text-foreground/90 leading-relaxed space-y-4 mb-16">
              <p>
                Welcome to Delhi Discoveries, a digital initiative dedicated to showcasing the unparalleled beauty, rich history, and vibrant culture of New Delhi. Our mission is to provide travelers, history enthusiasts, and curious minds with a comprehensive, modern, and visually stunning guide to one of the world's most fascinating cities.
              </p>
              <p>
                From the grand Mughal architecture and the colonial-era boulevards to the bustling markets and serene gardens, Delhi is a city of contrasts. We aim to capture this unique essence, blending heritage with modernity to offer a portal that is both informative and inspiring.
              </p>
              <p>
                This website was built as a demonstration of modern web development practices, leveraging Next.js, Tailwind CSS, and the power of Generative AI to create a premium user experience. Whether you're planning your first visit or seeking to rediscover the city's hidden gems, we hope Delhi Discoveries becomes your trusted companion.
              </p>
            </div>
            
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl md:text-3xl font-headline">Contact Us</CardTitle>
                <CardDescription>Have a question or suggestion? Drop us a line.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4 max-w-xl mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message..." />
                  </div>
                  <div className="text-center">
                    <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">Send Message</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
