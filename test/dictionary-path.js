'use strict';

const { expect } = require('chai');
const DictionaryPath = require('../lib/solution/dictionary-path');
const { getPathLength } = require('../lib/common/utils');
const { smallDictionary, mediumDictionary, bigDictionary } = require('../data/dictionary');

describe('Test suite for dictionary path', function() {
  describe('Get length of transformation sequence when dictionary is small', function() {
    let dictionaryPath;

    beforeEach(function() {
      dictionaryPath = new DictionaryPath(smallDictionary).createGraphFromSmallDict();
    });

    it('start word = "hit", end word = "dog" => length should be 3', function() {
      const path = dictionaryPath.findShortestPath('hit', 'dog');
      const size = getPathLength(path);
      expect(size).to.be.equal(3);
    });

    it('start word = "hit", end word = "cog" => length should be 4', function() {
      const path = dictionaryPath.findShortestPath('hit', 'cog');
      const size = getPathLength(path);
      expect(size).to.be.equal(4);
    });

    it('start word = "lol" (not in dict), end word = "dog" => length should be 0', function() {
      expect(function() {
        return dictionaryPath.findShortestPath('lol', 'dog');
      }).to.throw('Word "lol" not in dictionary');
    });

    it('start word = "dog", end word = "lol" (not in dict) => length should be 0', function() {
      expect(function() {
        return dictionaryPath.findShortestPath('dog', 'lol');
      }).to.throw('Word "lol" not in dictionary');
    });
  });

  describe('Get length of transformation sequence when dictionary is medium', function() {
    let dictionaryPath;

    beforeEach(function() {
      this.timeout(0);
      dictionaryPath = new DictionaryPath(mediumDictionary).createGraphFromBigDict();
    });

    it('start word = "blue", end word = "blur" => length should be 1', function() {
      this.timeout(0);
      const path = dictionaryPath.findShortestPath('blue', 'blur');
      const size = getPathLength(path);
      expect(size).to.be.equal(1);
    });

    it('start word = "ball", end word = "like" => length should be 4', function() {
      this.timeout(0);
      const path = dictionaryPath.findShortestPath('ball', 'like');
      const size = getPathLength(path);
      expect(size).to.be.equal(4);
    });
  });

  describe('Exceptions', function() {
    it('When dictionary is empty throws error', function() {
      const dictionaryPath = new DictionaryPath([]).createGraphFromSmallDict();
      expect(function() {
        return dictionaryPath.findShortestPath('hit', 'dog');
      }).to.throw('Word "hit" not in dictionary');
    });

    it('When graph has not being built throws error', function() {
      const dictionaryPath = new DictionaryPath([]);
      expect(function() {
        return dictionaryPath.findShortestPath('hit', 'dog');
      }).to.throw(
        'You must build the graph using either createGraphFromSmallDict() or createGraphFromBigDict()'
      );
    });
  });

  describe('Get length of transformation sequence when dictionary is big', function() {
    let dictionaryPath;

    beforeEach(function() {
      this.timeout(0);
      dictionaryPath = new DictionaryPath(bigDictionary).createGraphFromBigDict();
    });

    it('start word = "abbas", end word = "abbes" => length should be 1', function() {
      this.timeout(0);
      const path = dictionaryPath.findShortestPath('abbas', 'abbes');
      const size = getPathLength(path);
      expect(size).to.be.equal(1);
    });

    it('start word = "abaci", end word = "abbot" => length should be 0', function() {
      this.timeout(0);
      const path = dictionaryPath.findShortestPath('abaci', 'abbot');
      const size = getPathLength(path);
      expect(size).to.be.equal(0);
    });

    it('start word = "abase", end word = "awash" => length should be 2', function() {
      this.timeout(0);
      const path = dictionaryPath.findShortestPath('abase', 'awash');
      const size = getPathLength(path);
      expect(size).to.be.equal(2);
    });

    it('start word = "cozes", end word = "oozed" => length should be 2', function() {
      this.timeout(0);
      const path = dictionaryPath.findShortestPath('cozes', 'oozed');
      const size = getPathLength(path);
      expect(size).to.be.equal(2);
    });
  });
});
