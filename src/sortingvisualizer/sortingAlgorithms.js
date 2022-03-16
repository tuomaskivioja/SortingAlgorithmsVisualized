export function getBubbleSortAnimations(array) {
    const animations = []
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length-1-i; j++) {
            // change colours
            animations.push([j,j+1])
            // revert colours
            animations.push([j,j+1]) 
        if(array[j] > array[j+1]) {
            //Swap the numbers
            let temp = array[j]
            animations.push([j,array[j+1],j+1,array[j]])
            array[j] = array[j+1];
            array[j+1] = temp;
        }
        else {
          animations.push("noSwap")
        }
        }        
    }
    return animations
}

export function getSelectionSortAnimations(array) {
    const animations = []
    for(let i = 0; i < array.length; i++){
      // set current index as minimum
      let min = i;
      let temp = array[i];
      for(let j = i+1; j < array.length; j++){
        // change colours
        animations.push([min,j])
        // revert colours
        animations.push([min,j])
        //no swap yet
        animations.push("noSwap")
        if (array[j] < array[min]){
          //update minimum if current is lower that what we had previously
          min = j;
        }
      }
      // change colours
      animations.push([i,min])
      // revert colours
      animations.push([i,min])
      // swap the numbers
      animations.push([i,array[min],min,array[i]])
      array[i] = array[min];
      array[min] = temp;
    }
    return animations;
}

export function getQuickSortAnimations(array) {
  const animations = []
      // a function for swapping 2 elements
      function swap(arr, i1, i2) {
        const temp = arr[i2]
        // change colours
        animations.push([i1,i2])
        // revert colours
        animations.push([i1,i2])
        // swap the numbers
        animations.push([i1,arr[i2],i2,arr[i1]])
        arr[i2] = arr[i1]
        arr[i1] = temp
    }
    // base case
    if (array.length < 2) {
        return array
    }
    // select pivot element randomly
    const pivotIndex = 0
    // swap pivot to index 0. pivot element is thus forth at array[0]
    swap(array, pivotIndex, 0)
    // i denotes boundary between smaller and larger elements than pivot
    let i = 1
    // iterate over all elements larger than 0 (pivot). If the element is larger than
    // pivot, swap it with ith element and advance i
    for (let j = 1; j < array.length; j++) {
        //console.log(`iteration: ${j}`)
        if (array[j] < array[0]) {
            //console.log(array[j])
            swap(array, i, j)
            i++
        }
        else {
          // change colours
          animations.push([i,j])
          // revert colours
          animations.push([i,j])
          //no swap yet
          animations.push("noSwap")
        }
    }
    swap(array, 0, i-1)
    const leftArray = array.slice(0, i-1)
    const rightArray = array.slice(i, array.length)
    // recursively apply the same to left and right subarrays and merge
    const auxiliaryArray = array.slice()
    QuickSortHelper(leftArray, animations, auxiliaryArray, 0)
    QuickSortHelper(rightArray, animations, auxiliaryArray, i)
    return animations
}

function QuickSortHelper(mainArray, animations, auxArray, startIdx) {
    // base case
    if (mainArray.length < 2) {
      return
    }
    function swapNpush(arr, i1, i2, auxArr, Idx1, Idx2) {
      // change colours
      animations.push([Idx1,Idx2])
      // revert colours
      animations.push([Idx1,Idx2])
      // swap the numbers
      animations.push([Idx1,auxArr[Idx2],Idx2,auxArr[Idx1]])
      swap(arr, i1, i2)
      swap(auxArr, Idx1, Idx2)
  }
  function swap(arr, i1, i2) {
    const temp = arr[i2]
    arr[i2] = arr[i1]
    arr[i1] = temp
  }
    const pivotIndex = 0
    swapNpush(mainArray, pivotIndex, 0, auxArray, startIdx, startIdx)
    let i = 1
    let iTracker = startIdx + 1
    let jTracker = startIdx + 1
    for (let j = 1; j < mainArray.length; j++) {
        if (mainArray[j] < mainArray[0]) {
            //console.log(array[j])
            swapNpush(mainArray, i, j, auxArray, iTracker, jTracker)
            i++
            iTracker++
            jTracker++
        }
        else {
          // change colours
          animations.push([iTracker,jTracker])
          // revert colours
          animations.push([iTracker,jTracker])
          //no swap yet
          animations.push("noSwap")
          jTracker++
        }
    }
    swapNpush(mainArray, 0, i-1, auxArray, startIdx, iTracker-1)
    const leftArray = mainArray.slice(0, i-1)
    const rightArray = mainArray.slice(i, mainArray.length)
    // recursively apply the same to left and right subarrays and merge
    QuickSortHelper(leftArray, animations, auxArray, startIdx)
    QuickSortHelper(rightArray, animations, auxArray, iTracker)

}
export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }