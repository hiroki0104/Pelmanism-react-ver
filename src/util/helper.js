export function shaffle(arr) {
  let i = arr.length;
  while (i) {
    let j = Math.floor(Math.random() * i);
    let t = arr[--i];
    arr[i] = arr[j];
    arr[j] = t;
  }
  return arr;
}
