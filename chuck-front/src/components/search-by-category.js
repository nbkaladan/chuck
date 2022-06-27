// search-by-category.js
"use strict";

export default class SearchByCategory {
  constructor() {

  }

  async getFactsByCategory(category) {
    const response = await fetch(`/api/v1/facts/by_category/${category}`);
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const facts = await response.json();
    return facts;
  }

}
