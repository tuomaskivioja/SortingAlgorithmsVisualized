import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations, getBubbleSortAnimations, getSelectionSortAnimations, getQuickSortAnimations} from './sortingAlgorithms.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 250;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class SortingVisualizer extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        array: [],
      };
    }
  
    componentDidMount() {
      this.resetArray();
    }

    runSort(animations) {
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } 

        else if (animations[i] === "noSwap") {
          setTimeout(() => {
          }, i * ANIMATION_SPEED_MS);
        }
        
        else {
          setTimeout(() => {
            const [barOneIdx, newHeight1, barTwoIdx, newHeight2] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight1 * 0.1}%`;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barTwoStyle.height = `${newHeight2 * 0.1}%`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }

    resetArray() {
        const array = []
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomInteger(5, 1000))
        }
        this.setState({array});
    }
  
    mergeSort() {
      const animations = getMergeSortAnimations(this.state.array);
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight * 0.1}%`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }
  
    quickSort() {
      const animations = getQuickSortAnimations(this.state.array);
      this.runSort(animations)
    }
  
    selectionSort() {
      const animations = getSelectionSortAnimations(this.state.array);
      this.runSort(animations)
    }
  
    bubbleSort() {
      const animations = getBubbleSortAnimations(this.state.array);
      this.runSort(animations)
    }

    // addTime(start, end) {
    //   const arrayContainer = document.querySelector(".array-container");
    //   const bars = arrayContainer.firstChild;
    //   const timeTaken = Math.round((end - start) / 1000)
    //   const timeBox = document.createElement('div')
    //   timeBox.classList.add("timeBox")
    //   timeBox.innerHTML = `Elapsed time: ${timeTaken} seconds!`
    //   arrayContainer.insertBefore(timeBox, bars)
    // }
  
    render() {
      const {array} = this.state;
  
      return (
          <div className="app">
              <div className="navbar">
                  <button className="btn btn-warning" onClick={() => this.resetArray()}>Generate New Array</button>
                  <button className="btn btn-success" onClick={() => this.mergeSort()}>Merge Sort</button>
                  <button className="btn btn-success" onClick={() => this.quickSort()}>Quick Sort</button>
                  <button className="btn btn-success" onClick={() => this.selectionSort()}>Selection Sort</button>
                  <button className="btn btn-success" onClick={() => this.bubbleSort()}>Bubble Sort</button>
              </div>
              <div className="array-container">
                  <div className="array-bars-container">
                      {array.map((value, i) => (
                          <div
                              className="array-bar"
                              key={i}
                              style={{
                                  backgroundColor: PRIMARY_COLOR,
                                  height: `${value * 0.1}%`,
                              }}></div>
                      ))}
                  </div>
              </div>
          </div>
      );
    };
  }