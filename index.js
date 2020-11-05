'use strict';

(function () {
  window.addEventListener('load', init);

  function init() {
    fetchJoke();
    id('random-btn').addEventListener('click', fetchJoke);
    id('submit').addEventListener('click', fetchJoke);
    id('nerdy').addEventListener('click', fetchJoke);
    id('nasty').addEventListener('click', fetchJoke);
  }

  function fetchJoke() {
    const RANDOM = 'random';
    const URL = 'http://api.icndb.com/jokes/';
    const NERDY = '?limitTo=[nerdy]';
    const NASTY = '?limitTo=[explicit]';
    let url;
    if (id('page-number').value === '') {
      if (this != undefined && this.id === 'nerdy') {
        url = URL + RANDOM + NERDY;
      } else if (this != undefined && this.id === 'nasty') {
        url = URL + RANDOM + NASTY;
      } else {
        url = URL + RANDOM;
      }
    } else {
      url = URL + id('page-number').value;
    }
    fetch(url)
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
    updatePageText();
    let joke = data.value.joke;
    if (data.type != 'success') {
      handleError(data);
    } else if (joke != undefined) {
      joke = joke.replace(/&quot;/g, '"');
      id('joke').textContent = joke;
    } else {
      handleError(data);
    }
  }

  function handleError(err) {
    id('joke').textContent = 'Error: Nothing was written on this page.';
  }

  function updatePageText() {
    let pageNumber = id('page-number').value;
    if (pageNumber === '') {
      id('page-text').textContent = 'a random page';
    } else {
      id('page-text').textContent = 'page ' + pageNumber;
    }
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
