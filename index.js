/*
 * Name: Steven Wang
 * Date: November 4, 2020
 * Section: CSE 154 AF
 *
 * This is the script file that's responsible for the API call and behavior
 * of my Chuck Norris joke retriever page.
 * It includes the necessary fetch call, data processing, and error handling chain.
 */

'use strict';

(function() {
  window.addEventListener('load', init);

  /**
   * Initial API call to populate page, and adding event listeners to buttons
   */
  function init() {
    fetchJoke();
    id('random-btn').addEventListener('click', fetchJoke);
    id('submit').addEventListener('click', fetchJoke);
    id('nerdy').addEventListener('click', fetchJoke);
    id('nasty').addEventListener('click', fetchJoke);
  }

  /**
   * Fetch API the handles response, error chain
   */
  function fetchJoke() {
    const RANDOM = 'random';
    const URL = 'http://api.icndb.com/jokes/';
    const NERDY = '?limitTo=[nerdy]';
    const NASTY = '?limitTo=[explicit]';
    let url;
    if (id('page-number').value === '') {
      if (this !== undefined && this.id === 'nerdy') {
        url = URL + RANDOM + NERDY;
      } else if (this !== undefined && this.id === 'nasty') {
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

  /**
   * Checks whether response from API call is good
   * @param {Promise} response response from API call
   */
  async function checkResponse(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    } else {
      return response;
    }
  }

  /**
   * Process the JSON to display data on HTML
   * @param {JSON} data the JSON containing the joke, type and id
   */
  function processResponse(data) {
    updatePageText();
    let joke = data.value.joke;
    if (data.type !== 'success') {
      handleError(data);
    } else if (joke !== undefined) {
      joke = joke.replace(/&quot;/g, '"');
      id('joke').textContent = joke;
    } else {
      handleError(data);
    }
  }

  /**
   * Catch error and display to the user
   */
  function handleError() {
    id('joke').textContent = 'Error: Nothing was written on this page.';
  }

  /**
   * Updates the page number on the HTML page
   */
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
})();
