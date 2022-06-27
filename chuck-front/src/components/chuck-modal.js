// chuck-modal.js
"use strict";

export default class ChuckModal {
  constructor(modal, modalTitle, modalBody) {
    this.modal = modal;
    this.modalTitle = modalTitle;
    this.modalBody = modalBody;
  }

  showModal(title, body) {
    this.modalTitle.innerHTML = title;
    this.modalBody.innerHTML = body;
    this.modal.show();
  }

}
