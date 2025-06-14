import React from 'react';

interface VisualizerLayoutProps {
  title: string;
  description: string;
  visualizationArea: React.ReactNode;
  explanationPanel: React.ReactNode;
  stepControls: React.ReactNode;
}

export default function VisualizerLayout({
  title,
  description,
  visualizationArea,
  explanationPanel,
  stepControls,
}: VisualizerLayoutProps) {
  return (
    <div className="flex flex-col space-y-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary mb-2">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card p-4 rounded-lg shadow-md min-h-[300px] md:min-h-[400px] flex items-center justify-center">
            {visualizationArea}
          </div>
          <div className="lg:hidden"> {/* Show controls below visualizer on smaller screens */}
             {stepControls}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4">
          <div className="hidden lg:block"> {/* Show controls above explanation on larger screens */}
             {stepControls}
          </div>
          <div className="min-h-[300px] lg:min-h-[400px]">
            {explanationPanel}
          </div>
        </div>
      </div>
    </div>
  );
}
