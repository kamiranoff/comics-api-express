"use strict";

const fs = require('fs');

module.exports = class StaticDispatcher {

  static sendIndex(req, res) {
    const _root = process.cwd();

    res.type('.html');

    fs.createReadStream(_root + '/client/index.html')
      .pipe(res);
  }

  static uniq(a) {
    return Array.from(new Set(a));
  }

  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
};
