
// this contains my implementations of the algotithms with just numbers for practice

const Mergesort = (array) => {

    function mergeArrays(arr1, arr2) {

        const sortedArr = []
    
        while (arr1.length && arr2.length) {
            if (arr1[0] > arr2[0]) {
                sortedArr.push(arr2.shift())
            }
            else {
                sortedArr.push(arr1.shift())
            }
        }
    
        while (arr1.length) {
            sortedArr.push(arr1.shift())
          }
        while (arr2.length) {
            sortedArr.push(arr2.shift())
        }
    
        return sortedArr
    
    }

    if (array.length < 2) {
        return array
    }
    const middle = Math.floor(array.length/2)

    const subarrayA = array.slice(0, middle)
    const subarrayB = array.slice(middle, array.length)

    const sortedSubarrayA = Mergesort(subarrayA)
    const sortedSubarrayB = Mergesort(subarrayB)

    return mergeArrays(sortedSubarrayA, sortedSubarrayB)

}

const Quicksort = (array) => {
    // a function for swapping 2 elements
    function swap(arr, i1, i2) {
        const temp = arr[i2]
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
    }
    swap(array, 0, i-1)
    const leftArray = array.slice(0, i-1)
    const rightArray = array.slice(i, array.length)
    let completeArray = []
    // recursively apply the same to left and right subarrays and merge
    completeArray = completeArray.concat(...Quicksort(leftArray))
    completeArray.push(array[i-1])
    completeArray = completeArray.concat(...Quicksort(rightArray))
    return completeArray
}

const Bubblesort = (array) => {
    const length = array.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length-i; j++) { 
        if(array[j] > array[j+1]) {
            //Swap the numbers
            let temp = array[j]
            array[j] = array[j+1];
            array[j+1] = temp;
        }
        }        
    }

    return array;
}

const Selectionsort = (array) => {
    const length = array.length;
    for(let i = 0; i < length; i++){
      // set current index as minimum
      let min = i;
      let temp = array[i];
      for(let j = i+1; j < length; j++){
        if (array[j] < array[min]){
          //update minimum if current is lower that what we had previously
          min = j;
        }
      }
      array[i] = array[min];
      array[min] = temp;
    }
    return array;
}


let functions = {Mergesort, Quicksort, Bubblesort, Selectionsort}

export default functions