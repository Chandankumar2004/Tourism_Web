
'use client';

import React from 'react';
import Link from "next/link";
import { MapPin, Phone, Mail, Youtube, Twitter, Instagram, Facebook } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";


const exploreLinks = [
    { href: "/", label: "Home" },
    { href: "/explore?tab=attractions", label: "Attractions" },
    { href: "/explore?tab=food", label: "Food & Cuisine" },
    { href: "/explore?tab=culture", label: "Culture" },
    { href: "/explore?tab=shopping", label: "Shopping" },
    { href: "/metro-guide", label: "Metro Guide" },
    { href: "/explore?tab=guide", label: "Travel Guide" },
];

const socialLinks = [
    { href: "https://facebook.com", icon: Facebook },
    { href: "https://twitter.com", icon: Twitter },
    { href: "https://instagram.com", icon: Instagram },
    { href: "https://youtube.com", icon: Youtube },
]

function NewsletterForm() {
    const { toast } = useToast();
    const [email, setEmail] = React.useState('');
    const [submitting, setSubmitting] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch("https://formspree.io/f/mrezzrjn", {
                method: "POST",
                body: new FormData(event.currentTarget),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                toast({
                    title: "Subscribed!",
                    description: "Thanks for subscribing to our newsletter.",
                });
                setEmail('');
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Could not subscribe. Please try again.",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem connecting to the server.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <Input 
                type="email" 
                name="email"
                placeholder="Your email address" 
                className="bg-background border-border/20 text-foreground placeholder:text-muted-foreground flex-grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Button type="submit" disabled={submitting} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {submitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
        </form>
    );
}

export function Footer() {
  return (
    <footer className="bg-[#1F2937] text-[#D1D5DB]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div>
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary p-2 rounded-full">
                    <MapPin className="text-primary-foreground" />
                </div>
                <span className="font-headline text-xl text-[#F9FAFB] font-bold">New Delhi</span>
            </div>
            <p className="text-sm mb-4">
              Discover the heart of India. Experience centuries of history, vibrant culture, and modern marvels in the nation's capital.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(social => {
                const Icon = social.icon
                return (
                    <Link key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" className="bg-muted/20 p-2 rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                        <Icon className="h-5 w-5" />
                    </Link>
                )
              })}
            </div>
          </div>
          
          <div>
            <h3 className="font-headline text-lg text-[#F9FAFB] font-bold mb-4">Explore Delhi</h3>
            <ul className="space-y-2">
              {exploreLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-accent transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg text-[#F9FAFB] font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-1 text-primary shrink-0" />
                    <span>Delhi Tourism Office, Connaught Place, New Delhi, India - 110001</span>
                </li>
                <li className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0" />
                    <a href="tel:+919304335185" className="hover:text-accent transition-colors">+91-93043 35185</a>
                </li>
                <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary shrink-0" />
                    <a href="mailto:chandan32005c@gmail.com" className="hover:text-accent transition-colors">chandan32005c@gmail.com</a>
                </li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg text-[#F9FAFB] font-bold mb-4">Stay Updated</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for travel tips and updates.</p>
            <NewsletterForm />
          </div>

        </div>
        <div className="mt-12 border-t border-[#374151] pt-6 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="mb-2 sm:mb-0">&copy; {new Date().getFullYear()} Delhi Tourism. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
