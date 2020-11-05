'use strict';

(function () {
  window.addEventListener('load', init);

  function init() {
    // TODO: Add listeners
    console.log('js loaded');
    fetchJoke();
  }

  function fetchJoke() {
    const URL = 'http://api.icndb.com/jokes/56132/';
    fetch(URL)
      .then(checkResponse)
      .then((response) => response.json())
      .then(processResponse)
      .catch(handleError);
  }

  async function checkResponse(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    } else {
      return response;
    }
  }

  function processResponse(data) {
    if (data.type != 'success') {
      console.log('it got handleError');
      handleError(data);
    } else if (joke != undefined) {
      joke = joke.replace(/&quot;/g, '"');
      id('joke').textContent = joke;
    } else {
      handleError(data);
    }
  }

  function handleError(err) {
    let message = err.type;
    id('joke').textContent = message;
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
