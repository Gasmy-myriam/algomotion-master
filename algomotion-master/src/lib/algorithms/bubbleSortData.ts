import type { BubbleSortStep, AlgorithmDataItem } from '@/lib/types';

export const bubbleSortPseudocode = [
  "procedure bubbleSort(A : list of sortable items)",
  "  n = length(A)",
  "  repeat",
  "    swapped = false",
  "    for i = 1 to n-1 inclusive do",
  "      if A[i-1] > A[i] then",
  "        swap(A[i-1], A[i])",
  "        swapped = true",
  "      end if",
  "    end for",
  "    n = n - 1",
  "  until not swapped",
  "end procedure",
];

export function generateBubbleSortSteps(initialArray: number[]): BubbleSortStep[] {
  const steps: BubbleSortStep[] = [];
  let arr = [...initialArray];
  let n = arr.length;
  let swapped;

  steps.push({
    array: [...arr],
    explanation: "Initial state of the array.",
    pseudoCodeLine: 1,
    sortedIndices: []
  });

  let sortedCount = 0;

  do {
    swapped = false;
    steps.push({
      array: [...arr],
      explanation: "Start a new pass through the array.",
      pseudoCodeLine: 3,
      sortedIndices: Array.from({ length: sortedCount }, (_, k) => arr.length - 1 - k)
    });

    for (let i = 1; i < n; i++) {
      steps.push({
        array: [...arr],
        compare: [i - 1, i],
        explanation: `Comparing elements at index ${i - 1} (${arr[i - 1]}) and ${i} (${arr[i]}).`,
        pseudoCodeLine: 6,
        sortedIndices: Array.from({ length: sortedCount }, (_, k) => arr.length - 1 - k)
      });

      if (arr[i - 1] > arr[i]) {
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        swapped = true;
        steps.push({
          array: [...arr],
          swap: [i - 1, i],
          explanation: `Swapped elements ${arr[i]} and ${arr[i-1]}.`,
          pseudoCodeLine: 7,
          sortedIndices: Array.from({ length: sortedCount }, (_, k) => arr.length - 1 - k)
        });
      } else {
         steps.push({
          array: [...arr],
          compare: [i - 1, i],
          explanation: `Elements ${arr[i - 1]} and ${arr[i]} are in correct order. No swap.`,
          pseudoCodeLine: 6, // or 9 after if
          sortedIndices: Array.from({ length: sortedCount }, (_, k) => arr.length - 1 - k)
        });
      }
    }
    n--;
    sortedCount++; 
    steps.push({
      array: [...arr],
      explanation: `End of pass. Element ${arr[arr.length - sortedCount]} is now sorted. Reducing comparison range.`,
      pseudoCodeLine: 11,
      sortedIndices: Array.from({ length: sortedCount }, (_, k) => arr.length - 1 - k)
    });

  } while (swapped);

  steps.push({
    array: [...arr],
    explanation: "Array is fully sorted.",
    pseudoCodeLine: 12, // or 13 (end procedure)
    sortedIndices: Array.from({ length: arr.length }, (_, k) => k)
  });

  return steps;
}

export const bubbleSortData: AlgorithmDataItem<BubbleSortStep> = {
  name: "Bubble Sort",
  description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which means the list is sorted.",
  pseudocode: bubbleSortPseudocode,
  // Initial array will be provided/generated in the component
  steps: [], // Steps will be generated dynamically
};
