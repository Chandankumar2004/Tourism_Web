'use client';

import React, { useState } from 'react';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function ContactForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string[]; message?: string[] }>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    
    try {
      const response = await fetch("https://formspree.io/f/mrezzrjn", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSucceeded(true);
      } else {
        const data = await response.json();
        if (data.errors) {
          const formErrors: { email?: string[]; message?: string[] } = {};
          data.errors.forEach((error: { field: string; message: string; }) => {
            if (error.field === 'email') {
              if (!formErrors.email) formErrors.email = [];
              formErrors.email.push(error.message);
            }
            if (error.field === 'message') {
              if (!formErrors.message) formErrors.message = [];
              formErrors.message.push(error.message);
            }
          });
          setErrors(formErrors);
        } else {
          setErrors({ message: ["An unknown error occurred."] });
        }
      }
    } catch (error) {
      setErrors({ message: ["There was a problem submitting the form."] });
    } finally {
      setSubmitting(false);
    }
  };
  
  if (succeeded) {
      return <p className="text-center text-lg text-primary">Thanks for your message!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your Name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" placeholder="your@email.com" />
           {errors.email && <p className="text-sm text-destructive">{errors.email.join(', ')}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" placeholder="Your message..." />
        {errors.message && <p className="text-sm text-destructive">{errors.message.join(', ')}</p>}
      </div>
      <div className="text-center">
        <Button type="submit" disabled={submitting} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          {submitting ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
}


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
                <ContactForm />
              </CardContent>
            </Card>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
