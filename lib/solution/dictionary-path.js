'use strict';

const WordsGraphGenerator = require('../graph-generators/words-graph-generator');
const { findNodeByWord, printPath } = require('../../lib/common/utils');

class DictionaryPath {
  constructor(dictionary) {
    this.graphGenerator = new WordsGraphGenerator(dictionary);
  }

  /**
   * Createa graph for a small dictionary.
   */
  createGraphFromSmallDict() {
    this.graph = this.graphGenerator.buildGraphFromSmallDict();
    return this;
  }

  /**
   * Create a graph for a big dictionary.
   */
  createGraphFromBigDict() {
    this.graph = this.graphGenerator.buildGraphFromBigDict();
    return this;
  }

  /**
   * Traverses the graph using BFS.
   * Mutates the graph nodes.
   *
   * @param {object} startNode The source node.
   */
  bfsTraverse(startNode) {
    const queue = [startNode];

    // mark as visited
    startNode.visited = true;

    while (queue.length > 0) {
      const node = queue.shift();
      node.links.forEach(childWord => {
        const childNode = findNodeByWord(this.graph, childWord);
        if (!childNode.visited) {
          childNode.visited = true;
          childNode.parent = node;
          queue.push(childNode);
        }
      });
    }
  }

  /**
   * Uses BFS traversal to find shortest transformations sequence between start and end words.
   *
   * @param {string} start The start word.
   * @param {string} end The end word.
   * @return {number} The shortest length of transformation sequence from start to end.
   */
  findShortestPath(start, end) {
    if (!this.graph) {
      throw new Error(
        'You must build the graph using either createGraphFromSmallDict() or createGraphFromBigDict()'
      );
    }

    const startNode = findNodeByWord(this.graph, start);

    if (!startNode) {
      throw new Error(`Word "${start}" not in dictionary`);
    }

    const endNode = findNodeByWord(this.graph, end);

    if (!endNode) {
      throw new Error(`Word "${end}" not in dictionary`);
    }

    this.bfsTraverse(startNode);

    const path = this.getPath(startNode, endNode);
    return path;
  }

  /**
   * Returns an array that consists of nodes from start to end (inclusive).
   *
   * @param {object} startNode The source node.
   * @param {object} endNode The end node.
   * @return {array} The transformation sequence.
   */
  getPath(startNode, endNode) {
    const path = [];
    let node = endNode;

    while (node.parent) {
      path.unshift(node.word);
      node = node.parent;
    }

    // add source word
    path.unshift(startNode.word);

    // debug
    printPath(path);

    return path;
  }
}

module.exports = DictionaryPath;
