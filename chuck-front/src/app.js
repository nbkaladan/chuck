// app.js
"use strict";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core';
import 'bootstrap/js/dist/tab';
import Modal from 'bootstrap/js/dist/modal';
import './app.css';
import Categories from './components/categories';
import ChuckList from './components/chuck-list';
import ChuckModal from './components/chuck-modal';
import ChuckPagination from './components/chuck-pagination';
import SearchByCategory from './components/search-by-category';
import SearchByRandom from './components/search-by-random';
import SearchByText from './components/search-by-text';
import SendEmail from './components/send-mail';
import ChuckI18n from './components/chuck-i18n';

function onReady() {
  const parser = new DOMParser();

  const i18nSelect = document.getElementById('i18n');
  const chuckI18n = new ChuckI18n(i18nSelect);

  const select = document.getElementById('categories');
  new Categories(parser, select);
  const searchByText = new SearchByText();
  const searchByCategory = new SearchByCategory();
  const searchByRandom = new SearchByRandom();

  const modal = new Modal(document.getElementById('modal'));
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const chuckModal = new ChuckModal(modal, modalTitle, modalBody);

  const paginationWrapper = document.getElementById('pagination-wrapper');
  const paginationList = document.getElementById('pagination-list');
  const previousPage = document.getElementById('previous-page');
  const nextPage = document.getElementById('next-page');
  const textSearch = document.getElementById('text-search');
  const pagination = new ChuckPagination(parser, paginationWrapper, paginationList, previousPage, nextPage, textSearch);

  const sendMailButton = document.getElementById('send-email');
  const emailInput = document.getElementById('email');
  const sendEmail = new SendEmail(chuckModal, chuckI18n, emailInput, sendMailButton);

  const textSearchButton = document.getElementById('text-search-button');
  const randomButton = document.getElementById('random-button');
  const factsList = document.getElementById('facts-list');
  new ChuckList(parser, pagination, searchByText, searchByCategory, searchByRandom, sendEmail, textSearch, paginationWrapper, paginationList, previousPage, nextPage, textSearchButton, select, randomButton, factsList);
}

document.addEventListener('DOMContentLoaded', onReady);
