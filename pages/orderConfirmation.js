// products.page.js
const { expect } = require('@playwright/test');
const config = require('../playwright.config.js');
exports.OrderConfirmation = class OrderConfirmation {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.url = config.use.baseURL;
        this.backHomeButton = page.locator('#back-to-products');
        this.pageTitle = page.locator('.title');
        this.orderConfirmationMessage = page.locator('.complete-header');
    }

    async goto() {
        await this.page.goto('/checkout-complete.html');
    }

    async clickBackHomeButton() {
        await this.backHomeButton.click();
    }
    async verifyPageTitle() {
        const headerText = await this.pageTitle.textContent()
        return expect(headerText).toBe('Checkout: Complete!');
    }
    async verifyOrderConfirmationMessage() {
        const errorText = await this.orderConfirmationMessage.textContent()
        return expect(errorText).toBe('THANK YOU FOR YOUR ORDER');
    }

}