// chuck.pagination.js
"use strict";

export default class ChuckPagination {
  constructor(parser, paginationWrapper, paginationList, previousPage, nextPage, textSearch) {
    this.parser = parser;
    this.paginationWrapper = paginationWrapper;
    this.paginationList = paginationList;
    this.previousPage = previousPage;
    this.nextPage = nextPage;
    this.textSearch = textSearch;
    this.previousPageNumber = 0;
    this.nextPageNumber = 0;
  }

  fillPagination(data) {
    if (data.total <= 10) {
      return;
    }
    this.paginationWrapper.classList.remove('visually-hidden');
    const pages = Math.ceil(data.total / 10);
    Array.from({length: pages}, (_,i)=>i+1).forEach(pageNumber => {
      const pageNode = this.parser.parseFromString(this.getPaginationItemTemplate(pageNumber, data.current), 'text/html').body.firstChild;
      this.paginationList.insertBefore(pageNode, this.nextPage);
    });
    this.previousPageNumber = data.current;
    this.nextPageNumber = this.previousPageNumber + 2;
    if (this.previousPageNumber === 0) {
      this.previousPage.classList.add('visually-hidden')
    } else {
      this.previousPage.classList.remove('visually-hidden')
    }
    if (this.nextPageNumber > pages) {
      this.nextPage.classList.add('visually-hidden')
    } else {
      this.nextPage.classList.remove('visually-hidden')
    }
  }

  getStandardPaginationTemplate(pageNumber) {
    return `<li class="page-item page-action"><a class="page-link" href="#" data-page="${pageNumber}">${pageNumber}</a></li>`;
  }

  getCurrentPagePaginationTemplate(pageNumber) {
    return `<li class="page-item page-action active"><span class="page-link">${pageNumber}</span></li>`;
  }

  getPaginationItemTemplate(pageNumber, current) {
    if (pageNumber === current + 1) {
      return this.getCurrentPagePaginationTemplate(pageNumber);
    }
    return this.getStandardPaginationTemplate(pageNumber);
  }

}
