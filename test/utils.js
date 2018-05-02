'use strict';

const { expect } = require('chai');
const {
  areWordsDifferentByOneLetter,
  findNodeByWord,
  findIndexByNode,
  getPathLength
} = require('../lib/common/utils');
const Node = require('../lib/models/node');
const WordsGraphGenerator = require('../lib/graph-generators/words-graph-generator');
const { smallDictionary } = require('../data/dictionary');

describe('Test suite for utilities', function() {
  describe('Testing areWordsDifferentByOneLetter()', function() {
    it('check if words are different exactly by one letter', function() {
      expect(areWordsDifferentByOneLetter('car', 'cat')).to.be.equal(true);
      expect(areWordsDifferentByOneLetter('cog', 'fog')).to.be.equal(true);
      expect(areWordsDifferentByOneLetter('bot', 'but')).to.be.equal(true);
    });

    it('check if words are different *not* exactly by one letter', function() {
      expect(areWordsDifferentByOneLetter('lol', 'not')).to.be.equal(false);
      expect(areWordsDifferentByOneLetter('any', 'pom')).to.be.equal(false);
      expect(areWordsDifferentByOneLetter('neo', 'one')).to.be.equal(false);
    });

    it('check if words are different when one is empty', function() {
      expect(areWordsDifferentByOneLetter('', 'one')).to.be.equal(false);
    });

    it('check if words are different when both are empty', function() {
      expect(areWordsDifferentByOneLetter('', '')).to.be.equal(false);
    });
  });

  describe('Testing findNodeByWord()', function() {
    let graph;

    beforeEach(function() {
      graph = new WordsGraphGenerator(smallDictionary).buildGraphFromSmallDict();
    });

    it('should return the graph node corresponding to word "hit"', function() {
      const node = findNodeByWord(graph, 'hit');
      expect(node.word).to.be.equal('hit');
    });

    it('should return undefined when searching graph for word "lok"', function() {
      const node = findNodeByWord(graph, 'lok');
      expect(node).to.be.equal(undefined);
    });
  });

  describe('Testing findIndexByNode', function() {
    let graph;

    beforeEach(function() {
      graph = new WordsGraphGenerator(smallDictionary).buildGraphFromSmallDict();
    });

    it('should return 0 for first graph node', function() {
      const first = graph[0];
      expect(findIndexByNode(graph, first)).to.be.equal(0);
    });

    it('should return -1 for unknown node', function() {
      const unk = new Node(111, 'lol');
      expect(findIndexByNode(graph, unk)).to.be.equal(-1);
    });
  });

  describe('Testing getPathLength', function() {
    it('path length should be 0', function() {
      const path = undefined;
      expect(getPathLength(path)).to.be.equal(0);
    });

    it('path length should be 0', function() {
      const path = [];
      expect(getPathLength(path)).to.be.equal(0);
    });

    it('path length should be 2', function() {
      const path = [1, 2, 3];
      expect(getPathLength(path)).to.be.equal(2);
    });
  });
});
