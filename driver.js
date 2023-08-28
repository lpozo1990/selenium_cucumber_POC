const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless()) // Opciones adicionales, como ejecución en modo headless
    .build();

// Aquí puedes usar el 'driver' para interactuar con tu aplicación y realizar pruebas.
