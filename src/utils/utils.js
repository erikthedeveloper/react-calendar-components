/**
 * Generate a range of integers.
 * @param {int} startOrLength
 * @param {int} [end]
 * @return int[]
 */
export const range = (startOrLength, end) => {
  const rangeStart = end ? startOrLength : 0;
  return Array(end ? end - startOrLength : startOrLength).fill('')
    .map((_, i) => rangeStart + i)
};

/**
 * Chunk an array into n-length sub arrays.
 * @param {Array} array
 * @param {int} size
 * @return Array[]
 */
export const chunk = (array, size) =>
  range(Math.ceil(array.length / size))
    .map((i) => array.slice(i * size, (i * size) + size));
