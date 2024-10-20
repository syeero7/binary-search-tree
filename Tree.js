import Node from "./Node.js";
import timSort from "./timSort.js";

export default class Tree {
  #root;
  constructor() {
    this.#root = null;
  }

  buildTree(array) {
    array = timSort([...new Set(array)]);

    const build = (array, start, end) => {
      if (start > end) return null;

      const mid = start + Math.round((end - start) / 2);
      const root = new Node(array[mid]);
      root.left = build(array, start, mid - 1);
      root.right = build(array, mid + 1, end);

      return root;
    };

    this.#root = build(array, 0, array.length - 1);
  }

  prettyPrint() {
    const print = (node, prefix = "", isLeft = true) => {
      if (!node) return;

      if (node.right)
        print(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);

      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

      if (node.left)
        print(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    };

    print(this.#root);
  }

  insert(value) {
    const root = this.#root;

    if (!root) {
      this.#root = new Node(value);
      return;
    }
    const searchTree = (node) => {
      if (value < node.data && !node.left) {
        node.left = new Node(value);
        return;
      }
      if (value > node.data && !node.right) {
        node.right = new Node(value);
        return;
      }
      if (value < node.data && node.left) return searchTree(node.left);
      if (value > node.data && node.right) return searchTree(node.right);

      return null;
    };

    return searchTree(root);
  }

  deleteItem(value) {
    const deleteNode = (node, value) => {
      if (!node) return null;

      if (node.data == value) {
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        let current = node.left;

        while (current.right) current = current.right;
        node.data = current.data;
        node.left = deleteNode(node.left, current.data);
        return node;
      }

      if (node.data > value) {
        node.left = deleteNode(node.left, value);
        return node;
      } else {
        node.right = deleteNode(node.right, value);
        return node;
      }
    };

    this.#root = deleteNode(this.#root, value);
  }

  find(value) {
    let current = this.#root;

    while (current) {
      if (current.data == value) return current;
      if (current.data > value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  levelOrder(callback) {
    if (typeof callback !== "function")
      throw new TypeError(`${callback} is not a function`);

    if (!this.#root) return null;

    const queue = [];

    queue.push(this.#root);
    while (queue.length) {
      const node = queue.shift();

      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  inOrder(callback) {
    if (typeof callback !== "function")
      throw new TypeError(`${callback} is not a function`);

    if (!this.#root) return null;

    const traverseInOrder = (node) => {
      if (node.left) traverseInOrder(node.left);
      callback(node);
      if (node.right) traverseInOrder(node.right);
    };

    traverseInOrder(this.#root);
  }

  preOrder(callback) {
    if (typeof callback !== "function")
      throw new TypeError(`${callback} is not a function`);

    if (!this.#root) return null;

    const traversePreOrder = (node) => {
      callback(node);
      if (node.left) traversePreOrder(node.left);
      if (node.right) traversePreOrder(node.right);
    };

    traversePreOrder(this.#root);
  }

  postOrder(callback) {
    if (typeof callback !== "function")
      throw new TypeError(`${callback} is not a function`);

    if (!this.#root) return null;

    const traversePostOrder = (node) => {
      if (node.left) traversePostOrder(node.left);
      if (node.right) traversePostOrder(node.right);
      callback(node);
    };

    traversePostOrder(this.#root);
  }
}
