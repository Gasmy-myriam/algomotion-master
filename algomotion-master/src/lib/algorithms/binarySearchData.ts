import type { BinarySearchStep, AlgorithmDataItem } from '@/lib/types';

export const binarySearchPseudocode = [
  "function binarySearch(A, target):",
  "  low = 0",
  "  high = length(A) - 1",
  "  while low <= high:",
  "    mid = floor((low + high) / 2)",
  "    if A[mid] == target:",
  "      return mid  // Found",
  "    else if A[mid] < target:",
  "      low = mid + 1",
  "    else:",
  "      high = mid - 1",
  "  return -1 // Not found",
];

export function generateBinarySearchSteps(sortedArray: number[], target: number): BinarySearchStep[] {
  const steps: BinarySearchStep[] = [];
  let arr = [...sortedArray];
  let low = 0;
  let high = arr.length - 1;
  let mid: number | null = null;

  steps.push({
    array: [...arr],
    low,
    high,
    mid,
    target,
    explanation: `Initial state: Searching for ${target} in the array. Low is ${low}, High is ${high}.`,
    pseudoCodeLine: 1,
  });

  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    steps.push({
      array: [...arr],
      low,
      high,
      mid,
      target,
      explanation: `Calculated Mid = floor((${low} + ${high}) / 2) = ${mid}. Comparing A[${mid}] (${arr[mid]}) with target ${target}.`,
      highlightedIndices: [mid],
      pseudoCodeLine: 5,
    });

    if (arr[mid] === target) {
      steps.push({
        array: [...arr],
        low,
        high,
        mid,
        target,
        elementFound: true,
        searchComplete: true,
        explanation: `Element ${target} found at index ${mid}.`,
        highlightedIndices: [mid],
        secondaryHighlightedIndices: [mid], // Indicates found
        pseudoCodeLine: 7,
      });
      return steps;
    } else if (arr[mid] < target) {
      const oldLow = low;
      low = mid + 1;
      steps.push({
        array: [...arr],
        low: oldLow, // Show previous low for explanation
        high,
        mid,
        target,
        explanation: `A[${mid}] (${arr[mid]}) < target (${target}). Adjusting Low to ${low}.`,
        highlightedIndices: [mid],
        secondaryHighlightedIndices: Array.from({length: mid - oldLow + 1}, (_,i) => oldLow + i), // Range to discard
        pseudoCodeLine: 9,
      });
    } else {
      const oldHigh = high;
      high = mid - 1;
      steps.push({
        array: [...arr],
        low,
        high: oldHigh, // Show previous high for explanation
        mid,
        target,
        explanation: `A[${mid}] (${arr[mid]}) > target (${target}). Adjusting High to ${high}.`,
        highlightedIndices: [mid],
        secondaryHighlightedIndices: Array.from({length: oldHigh - mid + 1}, (_,i) => mid + i), // Range to discard
        pseudoCodeLine: 11,
      });
    }
     steps.push({ // Step showing new search range
      array: [...arr],
      low,
      high,
      mid: null, // Mid is recalculated in next loop
      target,
      explanation: `New search range: Low = ${low}, High = ${high}.`,
      pseudoCodeLine: 4, // Back to while condition
    });
  }

  steps.push({
    array: [...arr],
    low,
    high,
    mid,
    target,
    elementFound: false,
    searchComplete: true,
    explanation: `Element ${target} not found in the array. Low (${low}) > High (${high}).`,
    pseudoCodeLine: 12,
  });

  return steps;
}

export const binarySearchData: AlgorithmDataItem<BinarySearchStep> = {
  name: "Binary Search",
  description: "Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.",
  pseudocode: binarySearchPseudocode,
  // Initial array and target will be provided/generated in the component
  steps: [], // Steps will be generated dynamically
};
