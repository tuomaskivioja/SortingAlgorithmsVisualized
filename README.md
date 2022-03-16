# React App to visualize Sorting Algorithms

This app is a visual way to see merge sort, bubble sort, insertion sort and quick sort sorting algorithms in action.

## Implementation

By clicking 'genrate array' the user generates a number array of length 250 which is stored in the SortingVisualizer object's state. This is then translated into array bars by loopin gover the array and giving each bar a height of 0.1% times the value of the array.

By clicking on a button for any given algorithm, the user can see the array bars being sorted where the height of the bar represents a value in an array of numbers.

## The Algorithms

I have implemented the algorithms using numbers only in algorithms.js. Then, in sortingAlgorithms.js I have translated these into animations that I pass into the relevant algorithms inside SortingVisualizer.jsx which actually translates these animations into height values for the array bars in the visualizer.

## The Future

In the future, I will be implementing a toggle where the user can switch between a single algorithm view to a comparison window where multiple algorithms can be run in parallel.



