// categories.js
"use strict";

export default class Categories {
  constructor(parser, select) {
    this.parser = parser;
    this.select = select;
    this
      .fetchCategories()
      .then(categories=>{
        categories.forEach(category=>this.select.appendChild(this.parser.parseFromString(`<option value="${category}">${category}</option>`, 'text/html').body.firstChild))
      })
  }

  async fetchCategories() {
    const response = await fetch('/api/v1/categories');
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const categories = await response.json();

    return categories;
  }
}
