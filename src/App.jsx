import { useState, useEffect } from "react";
import "./App.css";

const SIZE = 50;

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
  // merge

  const mergeSort = (arr) => {
    if (arr.length <= 1) {
      return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    const mergedArray = merge(sortedLeft, sortedRight);

    return mergedArray;
  };

  const merge = (left, right) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };
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
      let arr = mergeSort(array);
      setArray(arr);
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
