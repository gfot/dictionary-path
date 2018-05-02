'use strict';

const { smallDictionary } = require('./data/dictionary');
const { getPathLength } = require('./lib/common/utils');
const DictionaryPath = require('./lib/solution/dictionary-path');

const startWord = 'hit';
const endWord = 'cog';

const dictionaryPath = new DictionaryPath(smallDictionary).createGraphFromSmallDict();
const path = dictionaryPath.findShortestPath(startWord, endWord);
console.log(
  `Start word: "${startWord}", End word: "${endWord}" has transformation path: "${path.join(
    ' -> '
  )}" and length=${getPathLength(path)}`
);
