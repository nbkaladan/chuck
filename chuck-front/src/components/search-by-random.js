// search-by-random.js
"use strict";

export default class SearchByRandom {
  constructor() {

  }

  async getRandomFact() {
    const response = await fetch("/api/v1/facts/random");
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const facts = await response.json();
    return facts;
  }

}
