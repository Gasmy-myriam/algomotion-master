export interface AlgorithmStep {
  explanation: string;
  pseudoCodeLine?: number;
}

export interface ArrayAlgorithmStep extends AlgorithmStep {
  array: number[];
  highlightedIndices?: number[];
  secondaryHighlightedIndices?: number[]; // For comparisons, swaps etc.
  sortedIndices?: number[]; // For elements in final sorted position
  pivotIndex?: number; // For algorithms like QuickSort
}

export interface BubbleSortStep extends ArrayAlgorithmStep {
  compare?: [number, number];
  swap?: [number, number];
}

export interface BinarySearchStep extends ArrayAlgorithmStep {
  low: number;
  high: number;
  mid: number | null;
  target?: number;
  elementFound?: boolean;
  searchComplete?: boolean;
}

export type AlgorithmType = 'bubble-sort' | 'binary-search';

export interface AlgorithmDataItem<TStep extends AlgorithmStep> {
  name: string;
  description: string;
  pseudocode: string[];
  initialArray?: number[]; // Optional, might be generated or fixed
  steps: TStep[];
}
