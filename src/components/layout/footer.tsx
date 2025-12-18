import Link from "next/link";
import { Wind, Twitter, Instagram, Facebook } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-secondary/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="flex items-center gap-2 font-headline font-bold text-xl">
              <Wind className="h-6 w-6 text-primary" />
              <span>Delhi Discoveries</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              Where History Lives and the Nation Breathes
            </p>
          </div>
          <nav className="flex gap-6 mb-4 md:mb-0">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook /></Link>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Delhi Discoveries. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
