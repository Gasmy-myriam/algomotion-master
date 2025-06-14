"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import VisualizerLayout from '@/components/algorithms/VisualizerLayout';
import StepControls from '@/components/algorithms/StepControls';
import ExplanationPanel from '@/components/algorithms/ExplanationPanel';
import { bubbleSortData, generateBubbleSortSteps } from '@/lib/algorithms/bubbleSortData';
import type { BubbleSortStep } from '@/lib/types';
import { useIsMobile } from '@/hooks/use-mobile'; // Assuming this hook exists

const DEFAULT_ARRAY = [5, 1, 4, 2, 8]; // Default initial array

export default function BubbleSortPage() {
  const [array, setArray] = useState<number[]>(DEFAULT_ARRAY);
  const [steps, setSteps] = useState<BubbleSortStep[]>(() => generateBubbleSortSteps([...DEFAULT_ARRAY]));
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(500); // milliseconds
  const isMobile = useIsMobile();


  const currentStepData = useMemo(() => steps[currentStepIndex] || steps[0], [steps, currentStepIndex]);

  useEffect(() => {
    // Regenerate steps if the initial array changes (e.g., user input for array)
    // For now, it's fixed, but this structure allows for dynamic array later.
    setSteps(generateBubbleSortSteps([...array]));
    setCurrentStepIndex(0);
  }, [array]);
  
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
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setArray([...DEFAULT_ARRAY]); // Reset to default or a new random array
  }, []);
  const handleNextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) setCurrentStepIndex(prev => prev + 1);
  }, [currentStepIndex, steps.length]);
  const handlePrevStep = useCallback(() => {
    if (currentStepIndex > 0) setCurrentStepIndex(prev => prev - 1);
  }, [currentStepIndex]);

  const maxVal = Math.max(...(currentStepData?.array || [1]));

  const visualizationArea = (
    <div className="w-full h-full flex items-end justify-center gap-1 p-4" aria-label="Bubble Sort Visualization">
      {(currentStepData?.array || []).map((value, idx) => {
        const heightPercentage = maxVal > 0 ? (value / maxVal) * 100 : 0;
        let bgColor = 'bg-primary/70'; // Default bar color
        if (currentStepData.sortedIndices?.includes(idx)) {
          bgColor = 'bg-green-500'; // Sorted elements
        } else if (currentStepData.compare?.includes(idx) || currentStepData.swap?.includes(idx)) {
          bgColor = 'bg-accent'; // Comparing or swapping elements
        }

        return (
          <div
            key={idx}
            className={`flex-grow rounded-t-md transition-all duration-300 ease-in-out ${bgColor} flex items-end justify-center text-primary-foreground text-xs pb-1`}
            style={{ height: `${Math.max(heightPercentage, 10)}%` }} // min height for visibility
            title={`Value: ${value}`}
            aria-valuenow={value}
          >
            <span className="transform rotate-0 sm:rotate-0">{value}</span>
          </div>
        );
      })}
    </div>
  );

  const explanationPanel = (
    <ExplanationPanel
      title="Bubble Sort Details"
      pseudocode={bubbleSortData.pseudocode}
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
      title="Bubble Sort Visualizer"
      description={bubbleSortData.description}
      visualizationArea={visualizationArea}
      explanationPanel={explanationPanel}
      stepControls={stepControls}
    />
  );
}
