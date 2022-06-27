// chuck-list.js
"use strict";

export default class ChuckList {
  constructor(parser, pagination, factByText, factByCategory, factByRandom, sendEmail, textSearch, paginationWrapper, paginationList, previousPage, nextPage, textSearchButton, select, randomButton, factsList) {
    this.parser = parser;
    this.pagination = pagination;
    this.factByText = factByText;
    this.factByCategory = factByCategory;
    this.factByRandom = factByRandom;
    this.sendEmail = sendEmail;

    this.paginationWrapper = paginationWrapper;
    this.paginationList = paginationList;
    this.previousPage = previousPage;
    this.nextPage = nextPage;
    this.textSearch = textSearch;
    this.textSearchButton = textSearchButton;
    this.select = select;
    this.randomButton = randomButton;
    this.factsList = factsList;

    this.addListeners();
  }

  clearList() {
    this.factsList.innerHTML = '';
    this.paginationWrapper.classList.add('visually-hidden');
    this.previousPage.classList.add('visually-hidden');
    this.nextPage.classList.add('visually-hidden');
    document.querySelectorAll(".page-item:not(#previous-page):not(#next-page)").forEach(element=>element.remove());
  }

  fillList(data) {
    this.clearList();
    this.sendEmail.searchId = data.id;
    data.response.forEach(fact => {
      const factNode = this.parser.parseFromString(`<li class="list-group-item">${fact.value}</li>`, 'text/html').body.firstChild;
      this.factsList.appendChild(factNode);
    });
    this.pagination.fillPagination(data);
  }

  paginate(pageNumber) {
    this.factByText.getFactsByText(this.textSearch.value, --pageNumber)
      .then((data) => this.fillList(data))
      .catch(() => this.clearList());
  }

  paginateIntoNext() {
    this.paginate(this.pagination.nextPageNumber);
  }

  paginateIntoPrevious() {
    this.paginate(this.pagination.previousPageNumber);
  }

  paginateInto(event) {
    event.preventDefault();
    const page = event.target.getAttribute("data-page");
    if(page){
      this.paginate(page);
    }
  }

  onTextSearchChanged(event) {
    if (!event.target.value || event.keyCode !== 13) {
      return;
    }
    this.factByText.getFactsByText(event.target.value)
      .then(data => this.fillList(data))
      .catch(() => this.clearList());
  }

  onTextSearchButtonPressed() {
    if (!this.textSearch.value) {
      return;
    }
    this.factByText.getFactsByText(this.textSearch.value)
      .then(data => this.fillList(data))
      .catch(() => this.clearList());
  }

  onCategoryChanged(event) {
    if (!event.target.value) {
      return;
    }
    this.factByCategory.getFactsByCategory(event.target.value)
      .then(data=>{
        data.response = [data.response];
        this.fillList(data);
      })
      .catch(() => this.clearList());
  }

  onRandonButtonPressed() {
    this.factByRandom.getRandomFact()
      .then(data=>{
        data.response = [data.response];
        this.fillList(data);
      })
      .catch(() => this.clearList());
  }

  addListeners() {
    this.paginationList.addEventListener('click', (event) => this.paginateInto(event));
    this.paginationList.addEventListener('touchstart', (event) => this.paginateInto(event));
    this.previousPage.addEventListener('click', (event) => this.paginateIntoPrevious(event));
    this.previousPage.addEventListener('touchstart', (event) => this.paginateIntoPrevious(event));
    this.nextPage.addEventListener('click', (event) => this.paginateIntoNext(event));
    this.nextPage.addEventListener('touchstart', (event) => this.paginateIntoNext(event));
    this.textSearch.addEventListener('keypress', (event) => this.onTextSearchChanged(event));
    this.textSearchButton.addEventListener('click', (event) => this.onTextSearchButtonPressed(event));
    this.textSearchButton.addEventListener('click', (event) => this.onTextSearchButtonPressed(event));
    this.select.addEventListener('input', (event) => this.onCategoryChanged(event));
    this.randomButton.addEventListener('click', (event) => this.onRandonButtonPressed(event));
    this.randomButton.addEventListener('touchstart', (event) => this.onRandonButtonPressed(event));
  }


}
