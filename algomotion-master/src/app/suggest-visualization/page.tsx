"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { suggestVisualization, type SuggestVisualizationInput, type SuggestVisualizationOutput } from '@/ai/flows/suggest-visualization';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lightbulb } from 'lucide-react';

const formSchema = z.object({
  algorithmType: z.string().min(3, { message: "Algorithm type must be at least 3 characters." }),
  algorithmDescription: z.string().min(10, { message: "Description must be at least 10 characters." }),
  targetAudience: z.string().min(3, { message: "Target audience must be at least 3 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SuggestVisualizationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestVisualizationOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      algorithmType: '',
      algorithmDescription: '',
      targetAudience: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await suggestVisualization(data as SuggestVisualizationInput);
      setSuggestion(result);
    } catch (error) {
      console.error("Error fetching visualization suggestion:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get suggestion. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Lightbulb className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">AI-Powered Visualization Suggester</CardTitle>
          <CardDescription className="text-lg">
            Describe an algorithm, and our AI will suggest the best way to visualize it for clarity and understanding.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="algorithmType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Algorithm Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Sorting, Pathfinding, Searching" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="algorithmDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Algorithm Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Detailed description of the algorithm, its steps, and logic." {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Target Audience</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., CS students, Beginners, Experts" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Suggestion...
                  </>
                ) : (
                  'Get Suggestion'
                )}
              </Button>
            </form>
          </Form>

          {suggestion && (
            <Card className="mt-8 bg-secondary">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">AI Suggestion:</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Visualization Idea:</h3>
                  <p className="text-muted-foreground">{suggestion.visualizationSuggestion}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Reasoning:</h3>
                  <p className="text-muted-foreground">{suggestion.reasoning}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
