// search-by-text.js
"use strict";

export default class SearchByText {
  constructor() {

  }

  async getFactsByText(text, offset) {
    const offsetParams = offset ? `&offset=${offset}` : '';
    const response = await fetch(`/api/v1/facts?keyword=${encodeURIComponent(text) + offsetParams}`);
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const facts = await response.json();
    return facts;
  }

}
