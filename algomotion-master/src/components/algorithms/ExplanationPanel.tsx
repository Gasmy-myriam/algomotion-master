import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ExplanationPanelProps {
  pseudocode: string[];
  currentExplanation: string;
  highlightedLines?: number[];
  title?: string;
}

export default function ExplanationPanel({
  pseudocode,
  currentExplanation,
  highlightedLines = [],
  title = "Algorithm Explanation"
}: ExplanationPanelProps) {
  return (
    <Card className="h-full flex flex-col shadow-md">
      <CardHeader>
        <CardTitle className="font-headline text-xl text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col space-y-4 overflow-hidden">
        <div className="flex-shrink-0">
          <h3 className="font-semibold text-lg mb-2 text-foreground">Current Step:</h3>
          <p className="text-sm text-muted-foreground min-h-[4em] bg-secondary p-3 rounded-md">
            {currentExplanation || "Algorithm visualization ready."}
          </p>
        </div>
        <div className="flex-grow flex flex-col overflow-hidden">
          <h3 className="font-semibold text-lg mb-2 text-foreground">Pseudocode:</h3>
          <ScrollArea className="flex-grow border rounded-md p-1 bg-secondary">
            <pre className="text-sm p-3 font-code">
              {pseudocode.map((line, index) => (
                <code
                  key={index}
                  className={`block whitespace-pre-wrap transition-colors duration-200 ${
                    highlightedLines.includes(index + 1) ? 'bg-accent/30 text-accent-foreground rounded p-0.5' : 'text-muted-foreground'
                  }`}
                >
                  {line}
                </code>
              ))}
            </pre>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
