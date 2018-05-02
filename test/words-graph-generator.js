'use strict';

const { expect } = require('chai');
const Node = require('../lib/models/node');
const { smallDictionary, mediumDictionary, bigDictionary } = require('../data/dictionary');
const WordsGraphGenerator = require('../lib/graph-generators/words-graph-generator');

describe('Test suite for words graph generator', function() {
  describe('Use small dictionary with corresponding graph builder function', function() {
    it('create graph should throw error if dictionary is not set', function() {
      const graphGenerator = new WordsGraphGenerator();
      expect(function() {
        graphGenerator.buildGraphFromSmallDict();
      }).to.throw('A dictionary must be specified.');
    });

    it('create graph should return an array of length 0', function() {
      const graphGenerator = new WordsGraphGenerator([]);
      expect(graphGenerator.buildGraphFromSmallDict().length).to.be.equal(0);
    });

    it('create graph should return an array of smallDictionary.length', function() {
      const graphGenerator = new WordsGraphGenerator(smallDictionary);
      expect(graphGenerator.buildGraphFromSmallDict().length).to.be.equal(smallDictionary.length);
    });

    it('create graph should return an array that contains Node elements, test first node element', function() {
      const graphGenerator = new WordsGraphGenerator(smallDictionary);
      const graph = graphGenerator.buildGraphFromSmallDict();
      const node = graph[0];

      expect(node.word).to.be.equal('hit');
      expect(node.visited).to.be.equal(false);
      expect(node.parent).to.be.equal(null);
      expect(node.links.length).to.be.equal(1);
      expect(node.links).to.have.same.members(['hot']);
    });

    it('create graph should return an array that contains Node elements', function() {
      const graphGenerator = new WordsGraphGenerator(smallDictionary);
      const graph = graphGenerator.buildGraphFromSmallDict();

      expect(graph).to.satisfy(function(nodes) {
        return nodes.every(function(node) {
          return node instanceof Node;
        });
      });
    });

    it('create graph should have each dictionary word in its nodes', function() {
      const graphGenerator = new WordsGraphGenerator(smallDictionary);
      const graph = graphGenerator.buildGraphFromSmallDict();
      const nodeWords = graph.map(node => node.word);
      expect(nodeWords).to.have.same.members(smallDictionary);
    });
  });

  describe('Use medium dictionary with graph builder for big dictionaries', function() {
    it('create graph should return an array of length 0', function() {
      const graphGenerator = new WordsGraphGenerator([]);
      expect(graphGenerator.buildGraphFromBigDict().length).to.be.equal(0);
    });

    it('create graph should return an array of smallDictionary.length', function() {
      this.timeout(0);
      const graphGenerator = new WordsGraphGenerator(mediumDictionary);
      expect(graphGenerator.buildGraphFromBigDict().length).to.be.equal(mediumDictionary.length);
    });

    it('create graph should return an array that contains Node elements, test first node element', function() {
      this.timeout(0);
      const graphGenerator = new WordsGraphGenerator(mediumDictionary);
      const graph = graphGenerator.buildGraphFromBigDict();
      const node = graph[0];

      expect(node.word).to.be.equal('aahs');
      expect(node.visited).to.be.equal(false);
      expect(node.parent).to.be.equal(null);
      expect(node.links.length).to.be.equal(3);
      expect(node.links).to.have.same.members(['dahs', 'hahs', 'aals']);
    });

    it('create graph should return an array that contains Node elements', function() {
      this.timeout(0);
      const graphGenerator = new WordsGraphGenerator(mediumDictionary);
      const graph = graphGenerator.buildGraphFromBigDict();

      expect(graph).to.satisfy(function(nodes) {
        return nodes.every(function(node) {
          return node instanceof Node;
        });
      });
    });

    it('create graph should have each dictionary word in its nodes', function() {
      this.timeout(0);
      const graphGenerator = new WordsGraphGenerator(mediumDictionary);
      const graph = graphGenerator.buildGraphFromBigDict();
      const nodeWords = graph.map(node => node.word);
      expect(nodeWords).to.have.same.members(mediumDictionary);
    });
  });

  describe('Use big dictionary with corresponding graph builder function', function() {
    it('create graph should throw error if dictionary is not set', function() {
      const graphGenerator = new WordsGraphGenerator();
      expect(function() {
        graphGenerator.buildGraphFromBigDict();
      }).to.throw('A dictionary must be specified.');
    });

    it('create graph should return an array of length 0', function() {
      const graphGenerator = new WordsGraphGenerator([]);
      expect(graphGenerator.buildGraphFromBigDict().length).to.be.equal(0);
    });

    it('create graph should return an array of length bigDictionary.length', function() {
      this.timeout(0);
      const graphGenerator = new WordsGraphGenerator(bigDictionary);
      const graph = graphGenerator.buildGraphFromBigDict();
      expect(graph.length).to.be.equal(bigDictionary.length);
    });

    it('create graph should return an array that contains Node elements, test first node element', function() {
      this.timeout(0);
      const graphGenerator = new WordsGraphGenerator(bigDictionary);
      const graph = graphGenerator.buildGraphFromBigDict();
      const node = graph[0];

      expect(node.word).to.be.equal('aahed');
      expect(node.visited).to.be.equal(false);
      expect(node.parent).to.be.equal(null);
      expect(node.links.length).to.be.equal(2);
      expect(node.links).to.have.same.members(['ached', 'ashed']);
    });

    it('create graph should return an array that contains Node elements', function() {
      this.timeout(0);
      const graphGenerator = new WordsGraphGenerator(bigDictionary);
      const graph = graphGenerator.buildGraphFromBigDict();

      expect(graph).to.satisfy(function(nodes) {
        return nodes.every(function(node) {
          return node instanceof Node;
        });
      });
    });

    it('create graph should have each dictionary word in its nodes', function() {
      this.timeout(0);
      const graphGenerator = new WordsGraphGenerator(bigDictionary);
      const graph = graphGenerator.buildGraphFromBigDict();
      const nodeWords = graph.map(node => node.word);
      expect(nodeWords).to.have.same.members(bigDictionary);
    });
  });
});
