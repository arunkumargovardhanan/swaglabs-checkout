// products.page.js
const { expect } = require('@playwright/test');
const config = require('../playwright.config.js');
exports.CheckOutOverview = class CheckOutOverview {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.url = config.use.baseURL;
        this.products = page.locator('.inventory_item_name');
        this.itemPriceList = page.locator('.inventory_item_price');
        this.placeOrder = page.locator('#finish');
        this.pageTitle = page.locator('.title');
    }

    async goto() {
        await this.page.goto('/checkout-step-two.html');
    }

    async getProductNames() {
        return await this.products.evaluateAll(list => list.map(element => element.textContent));
    }

    async getItemPriceList() {
        let priceLists = await this.itemPriceList.evaluateAll(list => list.map(element => element.textContent));
        return priceLists.map(s => s.slice(1)).map(i => Number(i))
    }

    async clickFinish() {
        return await this.placeOrder.click();
    }

    // async verifyItemsInCart(itemsAddedInProductPage) {
    //     const nameList = await this.getProductNames();
    //     return this.nameList.filter(item => !itemsAddedInProductPage.includes(item));
    // }

    async verifyItemsInCart(itemsAddedInProductPage) {
        const nameList = await this.getProductNames();
        console.log(nameList)
        return nameList.filter(item => !itemsAddedInProductPage.includes(item));
    }
    async verifyPageTitle() {
        const headerText = await this.pageTitle.textContent()
        return expect(headerText).toBe('Checkout: Overview');
    }
}