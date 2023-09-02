const { Builder, By, Key } = require("selenium-webdriver");
const { expect } = require("chai");
const { Given, When, Then, AfterAll, Before } = require("@cucumber/cucumber");

var driver;

// Inicializar el driver antes de las pruebas
Before(async function () {
  driver = new Builder().forBrowser("chrome").build();
});

// Cerrar el navegador después de todas las pruebas
AfterAll(async function () {
  await driver.quit();
});

Given(
  "I am on the Google search page",
  { timeout: 60 * 1000 },
  async function () {
    await driver.get("https://www.google.com");
  }
);

When(
  "I search for {string}",
  { timeout: 60 * 1000 },
  async function (searchTerm) {
    const searchBox = await driver.findElement(By.name("q"));
    await searchBox.sendKeys(searchTerm, Key.RETURN);
  }
);

Then(
  "the page title should start with {string}",
  { timeout: 60 * 1000 },
  async function (searchTerm) {
    const pageTitle = await driver.getTitle();
    const isTitleStartsWithSearchTerm = pageTitle
      .toLowerCase()
      .startsWith(searchTerm.toLowerCase());
    expect(isTitleStartsWithSearchTerm).to.equal(true);
  }
);
