// send-mail.js
"use strict";

export default class SendEmail {
  constructor(modal, chuckI18n, emailInput, sendMailButton) {
    this.modal = modal;
    this.chuckI18n = chuckI18n;
    this.emailInput = emailInput;
    this.sendMailButton = sendMailButton;
    this.searchId;

    this.addListeners();
  }

  addListeners() {
    this.sendMailButton.addEventListener('click', (event) => this.sendEmail(event));
    this.sendMailButton.addEventListener('touchstart', (event) => this.sendEmail(event));
  }

  sendResponsesTo(email) {
    fetch(`/api/v1/facts/${this.searchId}/notify`, {
      method: 'POST',
      body: JSON.stringify({
        to: email
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(() => this.onSendEmailOk())
    .catch(() => this.onSendEmailKo());
  }

  sendEmail() {
    if (! /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.emailInput.value)) {
      return this.modal.showModal(this.chuckI18n.currentConfigurationFor('sendEmailValidationErrorTitle'), this.chuckI18n.currentConfigurationFor('sendEmailValidationErrorBody'));
    }
    if (!this.searchId) {
      return this.modal.showModal(this.chuckI18n.currentConfigurationFor('sendEmailValidationWarningTitle'), this.chuckI18n.currentConfigurationFor('sendEmailValidationWarningBody'));
    }
    this.sendResponsesTo(this.emailInput.value);
  }

  onSendEmailOk() {
    this.modal.showModal(this.chuckI18n.currentConfigurationFor('sendEmailOkTitle'), this.chuckI18n.currentConfigurationFor('sendEmailOkBody'));
  }

  onSendEmailKo() {
    this.modal.showModal(this.chuckI18n.currentConfigurationFor('sendEmailKoTitle'), this.chuckI18n.currentConfigurationFor('sendEmailKoBody'));
  }

}
