// products.page.js
const { expect } = require('@playwright/test');
const config = require('../playwright.config.js');
exports.CheckOut = class CheckOut {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.url = config.use.baseURL;
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.postalCode = page.locator('#postal-code');
        this.cancel = page.locator('#cancel');
        this.continueCheckout = page.locator('#continue');
        this.errorMsg = page.locator('h3');
        // this.errorMsg = document.querySelector('[data-test="error"]').innerText;
    }

    async goto() {
        await this.page.goto('/checkout-step-one.html');
    }

    async clickCancel() {
        await this.cancel.click();
    }

    async clickCheckOut() {
        await this.continueCheckout.click();
    }

    async fillFirstName(name) {
        await this.firstName.fill(name);
    }

    async fillLastName(name) {
        await this.lastName.fill(name);
    }

    async enterZip(zip) {
        await this.postalCode.fill(zip);
    }

    async getFirstName() {
        return this.firstName;
    }

    async verifyErrorMessage() {
        const errorText = await this.errorMsg.textContent()
        return expect(errorText).toBe('Error: First Name is required');
    }

}