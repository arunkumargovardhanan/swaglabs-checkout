// products.page.js
const { expect } = require('@playwright/test');
const config = require('../playwright.config.js');
exports.CartPage = class CartPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.url = config.use.baseURL;
        this.products = page.locator('.inventory_item_name');
        this.itemPriceList = page.locator('.inventory_item_price');
        this.checkout = page.locator('#checkout');
        this.removeItem = page.locator('button[id^="remove-"]');
        this.continueShopping = page.locator('#continue-shopping');
    }

    async goto() {
        await this.page.goto('/cart.html');
    }

    async getProductNames() {
        return await this.products.evaluateAll(list => list.map(element => element.textContent));
    }

    async getItemPriceList() {
        return this.itemPriceList.evaluateAll(list => list.map(element => element.textContent));
    }

    async clickContinueShopping() {
        await this.continueShopping.click();
    }

    async clickCheckOut() {
        await this.checkout.click();
    }

    async removeItemFromCart() {
        await this.removeItem.click();
    }

    async verifyItemsInCart(itemsAddedInProductPage) {
        const nameList = await this.getProductNames();
        console.log(nameList)
        return nameList.filter(item => !itemsAddedInProductPage.includes(item));
    }

}