import { ThenableWebDriver, WebDriver } from "selenium-webdriver";

import { Builder, By, Key, until } from "selenium-webdriver";
import { assert } from "chai";
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const username = process.env.APP_USERNAME;
const password = process.env.APP_PASSWORD;
const app_url = process.env.APP_URL;

import { Given, Then, AfterAll, Before } from "@cucumber/cucumber";

var driver: WebDriver;

// Inicializar el driver antes de las pruebas
Before(async function () {
  driver = new Builder().forBrowser("chrome").build();
  await driver.manage().setTimeouts({ implicit: 10 * 1000 });
});

// Cerrar el navegador después de todas las pruebas
AfterAll(async function () {
  await driver.quit();
});

Given("I go to eventsdev url", { timeout: 60 * 1000 }, async function () {
  await driver.get(app_url as string);
});

Then("click on the host btn", { timeout: 60 * 1000 }, async function () {
  await driver.findElement(By.linkText("Continue as host")).click();
  let loginFormHeading = await driver.findElement(
    By.css("#localAccountForm .intro h2")
  );
  await driver.wait(until.elementIsVisible(loginFormHeading), 10 * 1000);
  assert(
    (await loginFormHeading.getText()) === "Sign in with your email address",
    "You are in the wrong page"
  );

  await driver.findElement(By.id("signInName")).sendKeys(username as string);
  await driver.findElement(By.id("password")).sendKeys(password as string);
  await driver.findElement(By.id("next")).sendKeys(Key.ENTER);
  let mainHeading = await driver.findElement(By.css(".mb-auto p"));
  await driver.wait(until.elementIsVisible(mainHeading), 10 * 1000);
  assert.include(
    await mainHeading.getText(),
    "When you are ready to begin",
    "Not Included"
  );
  await driver;
});

Then(
  "open a new tab and go to guest page",
  { timeout: 60 * 1000 },
  async function () {
    await driver.switchTo().newWindow("tab");
    await driver.get(app_url as string);
    await driver.findElement(By.linkText("Continue as guest")).click();
    let mainHeading = await driver.findElement(By.css("main h2"));
    await driver.wait(until.elementIsVisible(mainHeading), 15 * 1000);
    console.log(await mainHeading.getText());
  }
);
