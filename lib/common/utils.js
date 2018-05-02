'use strict';

/**
 * Returns true if the two words are different exactly by one letter, otherwise returns false.
 *
 * @param {string} word1 The first word to compare
 * @param {string} word2 The second word to compare
 * @return {boolean} A boolean that indicates comparison success or not
 */
function areWordsDifferentByOneLetter(word1, word2) {
  const word1Letters = Array.from(word1);
  const word2Letters = Array.from(word2);

  let areDifferentByOneLetter = false;

  // assumption: words have equal length
  // compare letters on same position

  for (let i = 0; i < word1Letters.length; i += 1) {
    if (word1Letters[i] !== word2Letters[i]) {
      if (!areDifferentByOneLetter) {
        areDifferentByOneLetter = true;
      } else {
        // if already different by one letter and comes another mismatch
        // then certainly invalidates the rule of exactly one mismatch
        return false;
      }
    }
  }

  return areDifferentByOneLetter;
}

/**
 * Returns the graph node corresponding to given word, otherwise returns undefined.
 *
 * @param {array} graph The given graph of nodes
 * @param {string} word The word to search for
 * @return {object} The corresponding Node in graph
 */
function findNodeByWord(graph, word) {
  return graph.find(node => node.word === word);
}

/**
 * Returns the index of given node in graph or -1 if not found.
 *
 * @param {array} graph The given graph of nodes
 * @param {object} node The graph node
 * @return {number} The index of node in graph
 */
function findIndexByNode(graph, node) {
  return graph.findIndex(n => n === node);
}

/**
 * Returns the length of the path (it counts edges).
 *
 * @param {array} path The array of nodes.
 * @return {number} The length path.
 */
function getPathLength(path) {
  if (!path || path.length === 0) {
    return 0;
  }
  return path.length - 1; // count edges, not vertices
}

/**
 * Prints the transformation sequence defined by the path.
 *
 * @param {string} path The path of nodes.
 */
function printPath(path) {
  console.log(path.join(' -> '));
}

module.exports = {
  areWordsDifferentByOneLetter,
  findNodeByWord,
  findIndexByNode,
  getPathLength,
  printPath
};
