import Link from "next/link";
import { MapPin, Phone, Mail, Youtube, Twitter, Instagram, Facebook } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const exploreLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Attractions" },
    { href: "/explore", label: "Food & Cuisine" },
    { href: "/explore", label: "Culture" },
    { href: "/explore", label: "Shopping" },
    { href: "/explore", label: "Travel Guide" },
];

const socialLinks = [
    { href: "https://facebook.com", icon: Facebook },
    { href: "https://twitter.com", icon: Twitter },
    { href: "https://instagram.com", icon: Instagram },
    { href: "https://youtube.com", icon: Youtube },
]

export function Footer() {
  return (
    <footer className="bg-secondary/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div>
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary p-2 rounded-full">
                    <MapPin className="text-primary-foreground" />
                </div>
                <span className="font-headline text-xl text-foreground font-bold">New Delhi</span>
            </div>
            <p className="text-sm mb-4 text-muted-foreground">
              Discover the heart of India. Experience centuries of history, vibrant culture, and modern marvels in the nation's capital.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(social => {
                const Icon = social.icon
                return (
                    <Link key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" className="bg-muted p-2 rounded-full text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Icon className="h-5 w-5" />
                    </Link>
                )
              })}
            </div>
          </div>
          
          <div>
            <h3 className="font-headline text-lg text-foreground font-bold mb-4">Explore Delhi</h3>
            <ul className="space-y-2">
              {exploreLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg text-foreground font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-1 text-primary shrink-0" />
                    <span>Delhi Tourism Office, Connaught Place, New Delhi, India - 110001</span>
                </li>
                <li className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0" />
                    <a href="tel:+919304335185" className="hover:text-primary transition-colors">+91-93043 35185</a>
                </li>
                <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary shrink-0" />
                    <a href="mailto:chandan32005c@gmail.com" className="hover:text-primary transition-colors">chandan32005c@gmail.com</a>
                </li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg text-foreground font-bold mb-4">Stay Updated</h3>
            <p className="text-sm mb-4 text-muted-foreground">Subscribe to our newsletter for travel tips and updates.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input type="email" placeholder="Your email address" className="bg-background border-border/20 text-foreground placeholder:text-muted-foreground flex-grow" />
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Subscribe</Button>
            </form>
          </div>

        </div>
        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p className="mb-2 sm:mb-0">&copy; {new Date().getFullYear()} Delhi Tourism. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
