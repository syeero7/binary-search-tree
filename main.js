import Tree from "./Tree.js";

function generateRandomNumbers(maxNum, length) {
  const randomNumbers = [];

  while (randomNumbers.length !== length) {
    randomNumbers.push(Math.floor(Math.random() * maxNum + 1));
  }

  return randomNumbers;
}

const array = [];
function getNodes(node) {
  array.push(node.data);
}
function clearArray() {
  array.splice(0);
}

const arr = generateRandomNumbers(100, 100);

const tree = new Tree();
tree.buildTree(arr);
tree.insert(192);
tree.prettyPrint();
console.log(tree.isBalanced());
console.log("-----------------------------------------------------");

tree.levelOrder(getNodes);
console.log(`levelOrder: ${array}`);
clearArray();
console.log("-----------------------------------------------------");

tree.preOrder(getNodes);
console.log(`preOrder: ${array}`);
clearArray();
console.log("-----------------------------------------------------");

tree.postOrder(getNodes);
console.log(`postOrder: ${array}`);
clearArray();
console.log("-----------------------------------------------------");

tree.inOrder(getNodes);
console.log(`inOrder: ${array}`);
clearArray();
console.log("-----------------------------------------------------");

tree.insert(102);
tree.insert(122);
tree.insert(134);
console.log(tree.isBalanced());
tree.rebalance();
tree.prettyPrint();
console.log(tree.isBalanced());
