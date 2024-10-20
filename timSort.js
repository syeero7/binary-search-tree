export default function timSort(array, start = 0, end = array.length) {
  const MIN_RUN = 32;

  while (start < end) {
    const length = end - start;

    if (length < MIN_RUN) {
      for (let i = start + 1; i < end; i++) {
        let current = array[i];
        let j = i - 1;

        while (j >= start && array[j] > current) {
          array[j + 1] = array[j];
          j--;
        }
        array[j + 1] = current;
      }
      start = end;
    } else {
      const middle = start + Math.floor(length / 2);

      timSort(array, start, middle);
      timSort(array, middle, end);

      if (array[middle - 1] > array[middle]) merge(array, start, middle, end);

      start = end;
    }
  }
  return array;
}

function merge(array, start, middle, end) {
  const left = array.slice(start, middle);
  const right = array.slice(middle, end);
  let i = 0;
  let j = 0;
  let k = start;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      array[k++] = left[i++];
    } else {
      array[k++] = right[j++];
    }
  }

  while (i < left.length) array[k++] = left[i++];
  while (j < right.length) array[k++] = right[j++];
}
