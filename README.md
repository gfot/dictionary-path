# Dictionary Path

## Problem statement

Given two words (start and end) and a dictionary, find the length of the
shortest transformation sequence from start to end, such that:

> Only one letter can be changed at a time
> Each intermediate word must exist in the given dictionary
> At each step, exactly one character is replaced by another character

For example:

start="hit"
end="cog"
dictionary=["hit", "dog", "dot", "cog", "hot", "log"]

As one of the shortest transformations is:
("hit" -> "hot" -> "dot" -> "dog" -> "cog")
return its length 4.

_Note_:

* All words have the same length
* All words contain only lowercase alphabetic characters
* You may hardcode example data into your app, no need to read input/files

## Install

Install dependencies by typing: `yarn install`.

## Usage

`yarn test` to run all tests
`yarn test:coverage` to run all tests and coverage
`yarn start` to run the example

## Questions

> How did you approach solving this problem?

* Step1: I've read the problem statement. Since when I studied mathematics, I have observed that the problem statement
  guides to the solution. Some key-words/phrases I extracted at this stage are: _shortest transformations length_,
  _one letter can be changed at a time_. I checked the example, tried to find patterns. I decided to start from the
  dictionary. Since a valid transformation is one between two words that belong to the dictionary if they only differ in
  exactly one letter, then I moved on to represent the data as a known structure. My data are the:

  * the dictionary
  * the start word (must belong in the dictionary)
  * the end word (must belong in the dictionary)
    The obvious approach is to have the dictionary words as vertices that connected with unweighted edges if they differ
    exactly by one letter. Comparison happens on each character of the words at same position. All the words have the same
    length. So the data structure to use would naturally be a graph. I know how to represent a set of data as a graph G=(V,E) where V is the set of vertices and E is the set of edges, we can use:
  * adjacency matrix:
    * space complexity: O(|V|^2), |V|: size of vertices set, |E|: size of edges set
    * time complexity:
      * query for edges/remove edge: O(1)
      * add new vertex: O(|V|^2)
    * if graph is sparse (few edges) consumes same amount of memory
  * adjacency list:
    * space complexity: O(|V|+|E|), |V|: size of vertices set, |E|: size of edges set
    * time complexity:
      * query for edges/remove edge: O(n)
      * add new vertex: O(1)

  Each one has its own advantages/disadvantages. Adjacency lists seem a better solution for memory usage, but adjacency
  matrix is more efficient to find relationships in graph. For small dictionaries like the one in example selecting matrix
  or list doesn't make much difference. If the dictionary is really big, then lists are better choice but matrix has
  better access times. I have decided to go with lists.

  The problem statement asks for the _shortest_ path. How can this be proved? Since I use a graph, I'll have to go with
  mathematical proven algorithms regarding the shortest characteristic. A little research shows that a BFS (Breadth First
  Search), when the graph is unweighted is mathematically proven that gives the shortest path between two nodes of the
  graph.

* Step2: Code structuring. At this step I took decisions about how to structure my code files. I have a `data/` folder to
  save dictionaries. A `lib/` folder to add all the appropriate files for the project. A `test/` directory to add the test
  files. I decided to use ES6 JavaScript as coding language. So I have used ESLint to catch common errors while typing. And
  I have used Prettier to auto format the code. I used `Mocha`, `Chai` and `nyc` (previously `Istanbul`) for test runner,
  assert library and code coverage respectively. I have set up some scripts in `package.json` to help with running tests and coverage. Also a script initializes the eslint configuration. The `lib/` directory eventually has the form:

  * lib/
    * common/ (common utilities)
    * graph-generators/ (graph generators to produce graph from dictionary)
    * models/ (models to use in program like nodes)
    * solution/ (the solution class of the problem)
  * test/ (contains test files)

* Step3: Write tests and coding. Firstly, I abstract the graph node/vertex to its own class. This is the base to construct
  a graph. The graph it's just an array of nodes. In order to create a graph from a dictionary, there is a class named
  `WordsGraphGenerator` that contains two methods:
  * `.buildGraphFromSmallDict()` creates a graph when a dictionary considered of small cardinality. By testing I've seen
    noticable delays in graph construction if the given dictionary has i.e. >5000 words. This method creates a graph by
    iterating the dictionary and compare each word with others and if the compared words have one letter only difference
    an edge is created between them.
  * `.buildGraphFromBigDict()` creates a graph when a dictionary considered of big cardinality. Part of this method was
    figured out during my initial analysis phase when designing things on paper. TBH I didn't checked at first if the
    method would be more efficient from the first one in case of big dictionaries. That became apparent when searching
    for a BFS pseudo-code to create the traversal algorithm I saw another analysis that contained that method explanation.
    And I decided to code it. The concept is that we can create _classes_ (like categories) that will contain words that
    differ exactly by one letter. These classes are created by getting a word and iterate on its letters nad each time
    remove one letter and replace it with a wildcard. Then add all words that appear while iterating the dictionary in
    appropriate class. Finally, these classes contain words that differ exactly by one letter so can iterate on these
    lists separately and create edges between their members.
    Then, I have created a class that will contain the solution of the problem named `DictionaryPath`. Uses
    the `.createGraphFromSmallDict()` to create a graph for a small dictionary and the `.createGraphFromBigDict()` to build
    a graph for a big dictionary. These methods must be called either the first or the other, before we use the
    `.findShortestPath(start, end)` method to get the length of transformation sequence from start to end. This method uses
    the BFS algorithm to traverse the graph. We use a queue to keep track the graph nodes and enhanced the Node model with
    a `visited` and `parent` attributes. While traversing the graph these information is populated. At the end, by traversing recursively the parents starting from the end-node we build the transformations sequence and get its
    length. Most tests have been written after coding.

> How did you check that your solution is correct?

I have written several tests. Firstly, I've checked that `WordsGraphGenerator` creates a valid graph. That is a graph that
contains the same number of nodes as the words in dictionary, and all the words in dictionary are in graph. Then I write
some tests for solution class `DictionaryPath`. To verify solution I get the given example and known answer for given
inputs and code tests using that knowledge. Also I have included another dictionary with other words of different length
from the previous one to verify that solution works for other cases also, by adding similar tests. Regarding the _shortest_
attribute I have used a well-known algorithm, BFS, that is mathematically proved that finds shortest path when graph is
unweighted.

> Specify any assumptions that you have made.

* words same length / lowercase alphabetic characters
* some tests may need `this.timeout(0)` to disable test timeout according to machine performance. In my machine the tests
  that needed this option is already being set.
