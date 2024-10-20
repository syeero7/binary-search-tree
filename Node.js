export default class Node {
  #data;
  #left;
  #right;
  constructor(data) {
    this.#data = data;
    this.#left = null;
    this.#right = null;
  }
  set data(data) {
    this.#data = data;
  }
  get data() {
    return this.#data;
  }
  set left(left) {
    this.#left = left;
  }
  get left() {
    return this.#left;
  }
  set right(right) {
    this.#right = right;
  }
  get right() {
    return this.#right;
  }
}
