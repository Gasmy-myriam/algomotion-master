"use client";

import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, SkipForward, SkipBack, ChevronRight, ChevronLeft } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface StepControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onSpeedChange: (speed: number) => void;
  isMobile?: boolean;
}

export default function StepControls({
  onPlay,
  onPause,
  onReset,
  onNextStep,
  onPrevStep,
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  onSpeedChange,
  isMobile = false,
}: StepControlsProps) {
  
  const NextIcon = isMobile ? ChevronRight : SkipForward;
  const PrevIcon = isMobile ? ChevronLeft : SkipBack;

  return (
    <div className="p-4 bg-card rounded-lg shadow-md space-y-4">
      <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center justify-between space-x-2'}`}>
        <div className={`flex ${isMobile ? 'w-full justify-around' : 'space-x-2'}`}>
          <Button onClick={onPrevStep} disabled={currentStep === 0 || isPlaying} aria-label="Previous Step" variant="outline" size={isMobile ? "default" : "icon"}>
            <PrevIcon className="h-5 w-5" /> {!isMobile && <span className="sr-only">Previous Step</span>}
          </Button>
          {isPlaying ? (
            <Button onClick={onPause} aria-label="Pause" variant="outline" size={isMobile ? "default" : "icon"} className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Pause className="h-5 w-5" /> {!isMobile && <span className="sr-only">Pause</span>}
            </Button>
          ) : (
            <Button onClick={onPlay} disabled={currentStep >= totalSteps -1} aria-label="Play" variant="outline" size={isMobile ? "default" : "icon"} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Play className="h-5 w-5" /> {!isMobile && <span className="sr-only">Play</span>}
            </Button>
          )}
          <Button onClick={onNextStep} disabled={currentStep >= totalSteps - 1 || isPlaying} aria-label="Next Step" variant="outline" size={isMobile ? "default" : "icon"}>
            <NextIcon className="h-5 w-5" /> {!isMobile && <span className="sr-only">Next Step</span>}
          </Button>
          <Button onClick={onReset} aria-label="Reset" variant="outline" size={isMobile ? "default" : "icon"}>
            <RotateCcw className="h-5 w-5" /> {!isMobile && <span className="sr-only">Reset</span>}
          </Button>
        </div>
        {!isMobile && (
          <div className="flex items-center space-x-2 min-w-[150px]">
            <span className="text-sm text-muted-foreground">Speed:</span>
            <Slider
              min={50}
              max={2000}
              step={50}
              value={[2050 - speed]} // Invert for intuitive slider (left=slow, right=fast)
              onValueChange={(value) => onSpeedChange(2050 - value[0])}
              className="w-full"
              aria-label="Animation Speed Control"
            />
          </div>
        )}
      </div>
       {isMobile && (
         <div className="flex items-center space-x-2 pt-2">
            <span className="text-sm text-muted-foreground">Speed:</span>
            <Slider
              min={50}
              max={2000}
              step={50}
              value={[2050 - speed]}
              onValueChange={(value) => onSpeedChange(2050 - value[0])}
              className="w-full"
              aria-label="Animation Speed Control"
            />
          </div>
       )}
      <div className="text-center text-sm text-muted-foreground">
        Step: {currentStep + 1} / {totalSteps}
      </div>
    </div>
  );
}
