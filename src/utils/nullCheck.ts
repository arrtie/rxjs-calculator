/** @format */

export default function nullCheck<T>(x: T) {
  if (x == null) {
    throw new Error(`the value ${x} is null`);
  }
  return x;
}
