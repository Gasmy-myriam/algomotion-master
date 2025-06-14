import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedBackground from '@/components/layout/AnimatedBackground';
import { BarChart2, SearchCode, BrainCircuit } from 'lucide-react';

const features = [
  {
    title: 'Bubble Sort Visualizer',
    description: 'See how the Bubble Sort algorithm arranges elements step by step.',
    href: '/bubble-sort',
    icon: <BarChart2 className="h-10 w-10 text-primary mb-4" />,
    cta: 'Visualize Bubble Sort',
  },
  {
    title: 'Binary Search Visualizer',
    description: 'Understand the efficiency of Binary Search in finding elements in a sorted list.',
    href: '/binary-search',
    icon: <SearchCode className="h-10 w-10 text-primary mb-4" />,
    cta: 'Visualize Binary Search',
  },
  {
    title: 'AI Visualization Suggester',
    description: 'Get AI-powered suggestions for the best way to visualize any algorithm.',
    href: '/suggest-visualization',
    icon: <BrainCircuit className="h-10 w-10 text-primary mb-4" />,
    cta: 'Get AI Suggestions',
  },
];

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center text-center overflow-hidden py-12">
      <AnimatedBackground />
      <div className="relative z-10 p-6 bg-background/80 backdrop-blur-sm rounded-lg shadow-xl">
        <h1 className="text-5xl md:text-6xl font-bold font-headline mb-6 text-primary">
          AlgoMotion
        </h1>
        <p className="text-xl md:text-2xl text-foreground mb-10 max-w-2xl mx-auto">
          Visualize how algorithms work, step by step. <br /> Making complex logic simple and interactive.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-2xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="items-center">
                {feature.icon}
                <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <CardDescription className="mb-6 text-base">
                  {feature.description}
                </CardDescription>
                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href={feature.href}>{feature.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-12 text-muted-foreground">
          Built for CS students and anyone curious about algorithms.
        </p>
      </div>
    </div>
  );
}
