'use strict';

(function () {
  window.addEventListener('load', init);

  function init() {
    // TODO: Add listeners
    console.log('js loaded');
  }

  /**
   * Returns a new element with the given id
   * @param {string} idName HTML id for the desired DOM element.
   * @return {object} DOM element with the corresponding HTML ID.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();
