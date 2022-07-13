const config = require('../playwright.config.js');
const { chromium, devices } = require('@playwright/test');
const iPhone = devices['iPhone 11'];
require('dotenv').config();
const launchOptions = {
    "headless": false,
    "executablePath": "/usr/bin/google-chrome",
    "args": [
        "--no-sandbox",
        "--no-zygote"
    ]
}
module.exports = async() => {
    const browser = await chromium.launch({ headless: false, slowMo: 300 });
    const context = await browser.newContext({
        ...iPhone,
        geolocation: { longitude: 52.520008, latitude: 13.404954 },
        permissions: ["geolocation"],
    });
    const page = await context.newPage();

    await page.goto(config.use.baseURL + '/');

    await page.fill('input[type="text"]', process.env.LOGIN_USERNAME);
    await page.fill('input[type="password"]', process.env.LOGIN_PASSWORD);
    await page.click('.submit-button');

    await page.context().storageState({ path: 'tests/state.json' });
    await browser.close();
};