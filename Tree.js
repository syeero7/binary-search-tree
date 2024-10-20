import Node from "../../binary-search-tree/Node.js";
import timSort from "../../binary-search-tree/timSort.js";

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
}
