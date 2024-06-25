import { useState, useEffect } from "react";
import "./App.css";

const SIZE = 8;

function App() {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [current, setCurrent] = useState([]);

  useEffect(() => {
    const newArr = makeArray();
    setArray(newArr);
  }, []);

  const bubbleSort = async (arr) => {
    setSorting(true);
    let sortedArray = [...arr];
    for (let i = 0; i < sortedArray.length; i++) {
      for (let j = 0; j < sortedArray.length - i - 1; j++) {
        if (sortedArray[j] > sortedArray[j + 1]) {
          let temp = sortedArray[j];
          sortedArray[j] = sortedArray[j + 1];
          sortedArray[j + 1] = temp;
          setCurrent([j, j + 1]);
          setArray([...sortedArray]);
          await new Promise((resolve) => setTimeout(resolve, 25));
        }
      }
    }
    setSorting(false);
  };

  const inSort = async (arr1) => {
    setSorting(true);
    let arr = [...arr1];
    let i, key, j;
    for (i = 1; i < arr.length; i++) {
      key = arr[i];
      j = i - 1;

      while (j >= 0 && arr[j] > key) {
        let tmp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = tmp;
        j = j - 1;
        setArray(arr);
        setCurrent([j + 1, i]);
        await new Promise((resolve) => setTimeout(resolve, 25));
      }
      arr[j + 1] = key;
      setArray(arr);
      setCurrent([j + 1, i]);
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    setSorting(false);
  };

  async function bogo(arr) {
    setSorting(true);
    while (!isSorted(arr)) {
      shuffle(arr);
      let newArr = [...arr];
      setArray(newArr);
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    setSorting(false);
    return arr;
  }
  const mergeSort = async (arr, n) => {
    var curr_size;
    var left_start;

    for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {
      for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
        var mid = Math.min(left_start + curr_size - 1, n - 1);
        var right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);

        // Log the array before merging
        console.log("Before merge: ", arr);
        let instanceArr = [...arr];
        setArray(instanceArr);
        await new Promise((resolve) => setTimeout(resolve, 25));

        await merge(arr, left_start, mid, right_end);

        // Log the array after merging
        console.log("After merge: ", arr);

        instanceArr = [...arr];
        setArray(instanceArr);
        await new Promise((resolve) => setTimeout(resolve, 25));

        // Update the array and wait
      }
    }
  };

  async function merge(arr, l, m, r) {
    var i, j, k;
    var n1 = m - l + 1;
    var n2 = r - m;

    var L = Array(n1).fill(0);
    var R = Array(n2).fill(0);

    for (i = 0; i < n1; i++) L[i] = arr[l + i];
    for (j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    i = 0;
    j = 0;
    k = l;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;

      // Log the array after each merge step
      console.log("Merging: ", arr);
      let instanceArr = [...arr];
      setArray(instanceArr);
      setCurrent([k]);
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;

      // Log the array after copying from L
      console.log("Copying from L: ", arr);
      let instanceArr = [...arr];
      setArray(instanceArr);
      setCurrent([k]);
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;

      // Log the array after copying from R
      console.log("Copying from R: ", arr);
      let instanceArr = [...arr];
      setArray(instanceArr);
      setCurrent([k]);
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }
  // maxIndex is min index in this case
  const selectionSort = async (arr) => {
    setSorting(true);
    let n = arr.length;
    let sortedArray = [...arr];

    for (let i = 0; i < n - 1; i++) {
      let maxIndex = i;

      for (let j = i + 1; j < n; j++) {
        if (sortedArray[j] < sortedArray[maxIndex]) {
          maxIndex = j;
        }
        setCurrent([j, maxIndex]);
        await new Promise((resolve) => setTimeout(resolve, 25));
      }

      let temp = sortedArray[maxIndex];
      sortedArray[maxIndex] = sortedArray[i];
      sortedArray[i] = temp;

      let newArr = [...sortedArray];
      setArray(newArr);
      setCurrent([maxIndex, i]);
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    setSorting(false);
  };
  const handleStart = () => {
    if (!sorting) {
      bubbleSort(array);
    }
  };
  const handleStart1 = () => {
    if (!sorting) {
      inSort(array);
    }
  };
  const handleStart2 = () => {
    if (!sorting) {
      bogo(array);
    }
  };

  const handleStart3 = () => {
    if (!sorting) {
      mergeSort(array, array.length);
    }
  };

  const handleStart4 = () => {
    if (!sorting) {
      selectionSort(array);
    }
  };

  return (
    <>
      <button onClick={handleStart} disabled={sorting}>
        {sorting ? "Sorting..." : "Bubble"}
      </button>
      <button onClick={handleStart1} disabled={sorting}>
        {sorting ? "Sorting..." : "Insert"}
      </button>
      <button onClick={handleStart2} disabled={sorting}>
        {sorting ? "Sorting..." : "Bogo"}
      </button>
      <button onClick={handleStart3} disabled={sorting}>
        {sorting ? "Sorting..." : "Merge"}
      </button>
      <button onClick={handleStart4} disabled={sorting}>
        {sorting ? "Sorting..." : "Selection"}
      </button>
      <div className="container">
        {array.map((n, i) => (
          <div
            style={{
              width: n * 10,
              backgroundColor:
                i === current[0] || i === current[1] ? "#c92727" : "grey",
            }}
            key={i}
            className="array-item"
          ></div>
        ))}
      </div>
    </>
  );
}

export default App;

function makeArray() {
  let arr = [];
  for (let i = 0; i < SIZE; i++) {
    arr.push(Math.round(Math.random() * 100));
  }
  return arr;
}

function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
