'use strict';

const Node = require('../models/node');
const { areWordsDifferentByOneLetter, findNodeByWord } = require('../common/utils');

class WordsGraphGenerator {
  constructor(dictionary) {
    this.dictionary = dictionary;
  }

  /**
   * Creates a words graph from a small dictionary.
   * Time Complexity: O(n^2)
   *
   * @return {array} Creates an array of nodes that represents the words graph.
   */
  buildGraphFromSmallDict() {
    if (!this.dictionary || !Array.isArray(this.dictionary)) {
      throw new Error(`A dictionary must be specified.`);
    }

    const graph = [];
    const dictionaryLength = this.dictionary.length;

    for (let currentWord of this.dictionary) {
      const currentVertex = new Node(currentWord);
      graph.push(currentVertex);
      for (let checkIndex = 0; checkIndex < dictionaryLength; checkIndex += 1) {
        const checkWord = this.dictionary[checkIndex];
        if (areWordsDifferentByOneLetter(currentWord, checkWord)) {
          // create undirected unweighted edge/link between two words
          currentVertex.addLink(checkWord);
        }
      }
    }

    return graph;
  }

  /**
   * Creates a words graph from a big dictionary.
   * Time Complexity: O(m*n)
   *
   * @return {array} Creates an array of nodes that represents the words graph.
   */
  buildGraphFromBigDict() {
    if (!this.dictionary || !Array.isArray(this.dictionary)) {
      throw new Error(`A dictionary must be specified.`);
    }

    const map = new Map();

    // create bucket classes from words that differ by one letter
    for (let currentWord of this.dictionary) {
      // create backets & populate with words
      for (let i = 0; i < currentWord.length; i += 1) {
        // create bucket class name
        const bucket = currentWord.slice(0, i) + '*' + currentWord.slice(i + 1);
        if (map.has(bucket)) {
          const bucketList = map.get(bucket);
          bucketList.push(currentWord);
        } else {
          map.set(bucket, [currentWord]);
        }
      }
    }

    // populate graph with nodes
    const graph = [];
    for (let bucket of map.keys()) {
      const bucketList = map.get(bucket);
      bucketList.forEach(word1 => {
        const node1 = new Node(word1);
        bucketList.forEach(word2 => {
          if (bucketList.length === 1) {
            // if bucketList has length 1 and the word is not in graph, add it
            const node = findNodeByWord(graph, word1);
            if (!node) {
              graph.push(node1);
            }
          } else {
            if (word1 !== word2) {
              const node = findNodeByWord(graph, word1);
              if (!node) {
                graph.push(node1);
                node1.addLink(word2);
              } else {
                node.addLink(word2);
              }
            }
          }
        });
      });
    }

    return graph;
  }
}

module.exports = WordsGraphGenerator;
