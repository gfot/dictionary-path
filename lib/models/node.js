'use strict';

class Node {
  constructor(word) {
    this._word = word;
    this._visited = false;
    this._parent = null;
    this._links = [];
  }

  get word() {
    return this._word;
  }

  get visited() {
    return this._visited;
  }

  get parent() {
    return this._parent;
  }

  get links() {
    return this._links;
  }

  set visited(value) {
    this._visited = value;
  }

  set parent(value) {
    this._parent = value;
  }

  addLink(word) {
    this._links.push(word);
  }

  toString() {
    return `word: ${this._word}
    visited: ${this._visited}
    parent: ${this.parent}
    links: ${this._links}
    `;
  }
}

module.exports = Node;
