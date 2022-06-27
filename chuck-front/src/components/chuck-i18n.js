// chuck-i18n.js
"use strict";

export default class ChuckI18n {
  constructor(i18nSelect) {
    this.i18nSelect = i18nSelect;

    this.languages = new Map([
      ["en", {
        "language": "en",
        "translations": {
            "webTitle": "Chuck Norris Facts",
            "webDescription": "Chuck Norris Facts: Awesome!",
            "appTitle": "Your beloved Chuck Norris Facts",
            "categoriesTab": "Categories",
            "textTab": "Text",
            "randomTab": "Random",
            "selectCategoryOption": "Select a category",
            "textSearchPlaceholder": "Type your text search and press enter...",
            "textSearchButton": "Search",
            "randomSearchButton": "Press to generate random fact",
            "firstListItem": "Awesome Chuck Norris facts are awaiting you",
            "sendEmailPlaholder": "Email to send search results to...",
            "sendEmailButton": "Send",
            "modalCloseButton": "Close",
            "sendEmailValidationErrorTitle": "Error",
            "sendEmailValidationErrorBody": "Provided email address is not valid",
            "sendEmailValidationWarningTitle": "Alert",
            "sendEmailValidationWarningBody": "Do a search before",
            "sendEmailOkTitle": "Sent",
            "sendEmailOkBody": "Search results sent. Check your email.",
            "sendEmailKoTitle": "Error",
            "sendEmailKoBody": "There was an error sending you the search results. Try again later."
        }
    }],
    ["es", {
      "language": "es",
      "translations": {
          "webTitle": "Hazañas de Chuck Norris",
          "webDescription": "Hazañas de Chuck Norris: ¡Increíbles!",
          "appTitle": "Tus hazañas de Chuck Norris",
          "categoriesTab": "Categorias",
          "textTab": "Texto",
          "randomTab": "Aleatorio",
          "selectCategoryOption": "Selecciona una categoria",
          "textSearchPlaceholder": "Escribe el texto para la búsqueda y presiona enter...",
          "textSearchButton": "Buscar",
          "randomSearchButton": "Presiona para generar una hazaña aleatoria",
          "firstListItem": "Increíbles hazañas de Chuck Norris te están esperando",
          "sendEmailPlaholder": "Introduce un email para enviarte los resultados de ésta búsqueda...",
          "sendEmailButton": "Enviar",
          "modalCloseButton": "Cerrar",
          "sendEmailValidationErrorTitle": "Error",
          "sendEmailValidationErrorBody": "La dirección de email no es válida",
          "sendEmailValidationWarningTitle": "Alerta",
          "sendEmailValidationWarningBody": "Haz una búsqueda antes",
          "sendEmailOkTitle": "Enviado",
          "sendEmailOkBody": "Se han enviado los resultados de la búsqueda. Verifica tu email.",
          "sendEmailKoTitle": "Error",
          "sendEmailKoBody": "Ha ocurrido un error enviandote los resultados de la búsqueda. Inténtalo de nuevo mas tarde."
      }
    }]]);
    this.current = "en";

    this.i18nSelect.addEventListener('input', (event) => this.onI18nChanged(event));
  }

  get currentConfiguration() {
    return this.languages.get(this.current);
  }

  currentConfigurationFor(key) {
    const config = this.languages.get(this.current);
    return config.translations[key];
  }

  onI18nChanged(event) {
    this.translateInto(event.target.value);
  }

  translateInto(newLanguage) {
    if (!this.languages.get(newLanguage)) {
      return;
    }
    this.current = newLanguage;
    const currentConf = this.currentConfiguration;

    const elements = document.querySelectorAll("[data-i18n]")
    elements.forEach(element => this.replaceText(element, currentConf.translations));

    const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]");
    placeholderElements.forEach(element => this.replaceTextInPlaceholder(element, currentConf.translations));

    const contentElements = document.querySelectorAll("[data-i18n-content]");
    contentElements.forEach(element => this.replaceTextInContent(element, currentConf.translations));
  }

  replaceText(element, config) {
    const key = element.getAttribute("data-i18n");
    element.innerText = config[key] || element.innerText;
  }

  replaceTextInPlaceholder(element, config) {
    const key = element.getAttribute("data-i18n-placeholder");
    element.placeholder = config[key] || element.placeholder;
  }

  replaceTextInContent(element, config) {
    const key = element.getAttribute("data-i18n-content");
    element.content = config[key] || element.content;
  }

}
