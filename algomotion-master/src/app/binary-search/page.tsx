"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import VisualizerLayout from '@/components/algorithms/VisualizerLayout';
import StepControls from '@/components/algorithms/StepControls';
import ExplanationPanel from '@/components/algorithms/ExplanationPanel';
import { binarySearchData, generateBinarySearchSteps } from '@/lib/algorithms/binarySearchData';
import type { BinarySearchStep } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-mobile';

const DEFAULT_SORTED_ARRAY = [2, 5, 7, 8, 11, 12, 15, 18, 22, 25];
const DEFAULT_TARGET = 15;

export default function BinarySearchPage() {
  const [array, setArray] = useState<number[]>(DEFAULT_SORTED_ARRAY);
  const [target, setTarget] = useState<number>(DEFAULT_TARGET);
  const [inputValue, setInputValue] = useState<string>(DEFAULT_TARGET.toString());

  const [steps, setSteps] = useState<BinarySearchStep[]>(() => generateBinarySearchSteps([...array], target));
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1000); // milliseconds
  const isMobile = useIsMobile();

  const currentStepData = useMemo(() => steps[currentStepIndex] || steps[0], [steps, currentStepIndex]);

  const regenerateStepsAndReset = useCallback((newArray: number[], newTarget: number) => {
    setArray(newArray); // Though array is fixed for now, this allows future changes
    setTarget(newTarget);
    setSteps(generateBinarySearchSteps([...newArray], newTarget));
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    regenerateStepsAndReset(array, target);
  }, [array, target, regenerateStepsAndReset]);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStepIndex < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, animationSpeed);
    } else if (isPlaying && currentStepIndex >= steps.length - 1) {
      setIsPlaying(false); // Stop playing at the end
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, steps.length, animationSpeed]);

  const handlePlay = useCallback(() => setIsPlaying(true), []);
  const handlePause = useCallback(() => setIsPlaying(false), []);
  const handleReset = useCallback(() => {
    setInputValue(DEFAULT_TARGET.toString());
    regenerateStepsAndReset([...DEFAULT_SORTED_ARRAY], DEFAULT_TARGET);
  }, [regenerateStepsAndReset]);
  
  const handleNextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) setCurrentStepIndex(prev => prev + 1);
  }, [currentStepIndex, steps.length]);
  
  const handlePrevStep = useCallback(() => {
    if (currentStepIndex > 0) setCurrentStepIndex(prev => prev - 1);
  }, [currentStepIndex]);

  const handleTargetChange = () => {
    const newTarget = parseInt(inputValue, 10);
    if (!isNaN(newTarget)) {
      regenerateStepsAndReset(array, newTarget);
    }
  };

  const visualizationArea = (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Label htmlFor="targetInput" className="text-lg">Target:</Label>
        <Input 
          id="targetInput"
          type="number" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          className="w-24 text-center"
        />
        <Button onClick={handleTargetChange} variant="outline" className="bg-accent text-accent-foreground hover:bg-accent/90">Set Target</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2" aria-label="Binary Search Visualization">
        {(currentStepData?.array || []).map((value, idx) => {
          let cellStyles = 'border border-primary text-primary bg-card px-4 py-2 rounded-md text-lg font-medium transition-all duration-300';
          let isDisabled = false;

          if (currentStepData.low > idx || currentStepData.high < idx) {
            cellStyles += ' opacity-30 bg-muted'; 
            isDisabled = true;
          }
          if (idx === currentStepData.mid) {
            cellStyles += ' ring-4 ring-accent scale-110'; 
          }
          if (currentStepData.elementFound && idx === currentStepData.mid) {
            cellStyles += ' bg-green-500 text-white ring-green-600'; 
          }
           if (currentStepData.searchComplete && !currentStepData.elementFound && idx === currentStepData.mid) {
             cellStyles += ' bg-red-500 text-white ring-red-600'; 
           }


          return (
            <div
              key={idx}
              className={cellStyles}
              aria-disabled={isDisabled}
              aria-label={`Array element ${value} at index ${idx}`}
            >
              {value}
            </div>
          );
        })}
      </div>
        {currentStepData?.searchComplete && (
          <p className={`mt-4 text-xl font-semibold ${currentStepData.elementFound ? 'text-green-600' : 'text-red-600'}`}>
            {currentStepData.elementFound ? `Target ${target} found at index ${currentStepData.mid}!` : `Target ${target} not found.`}
          </p>
        )}
    </div>
  );

  const explanationPanel = (
    <ExplanationPanel
      title="Binary Search Details"
      pseudocode={binarySearchData.pseudocode}
      currentExplanation={currentStepData?.explanation || "Algorithm ready."}
      highlightedLines={currentStepData?.pseudoCodeLine ? [currentStepData.pseudoCodeLine] : []}
    />
  );

  const stepControls = (
    <StepControls
      onPlay={handlePlay}
      onPause={handlePause}
      onReset={handleReset}
      onNextStep={handleNextStep}
      onPrevStep={handlePrevStep}
      isPlaying={isPlaying}
      currentStep={currentStepIndex}
      totalSteps={steps.length}
      speed={animationSpeed}
      onSpeedChange={setAnimationSpeed}
      isMobile={isMobile}
    />
  );

  return (
    <VisualizerLayout
      title="Binary Search Visualizer"
      description={binarySearchData.description}
      visualizationArea={visualizationArea}
      explanationPanel={explanationPanel}
      stepControls={stepControls}
    />
  );
}
