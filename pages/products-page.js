// products.page.js
const { expect } = require('@playwright/test');
const config = require('../playwright.config.js');
exports.ProductsDetailPage = class ProductsDetailPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.url = config.use.baseURL;
        this.products = page.locator('.inventory_item_name');
        // this.texts = await this.products.evaluateAll(list => list.map(element => element.textContent));
        this.itemPriceList = page.locator('.inventory_item_price');
        this.selectDisplayOrder = page.locator('.select_container');
        this.linkToCart = page.locator('.shopping_cart_link');
        this.buttonBurgerMenu = page.locator('#react-burger-menu-btn');
        this.logOut = page.locator('a', { hasText: 'Logout' });
        this.restAppState = page.locator('a', { hasText: 'Reset App State' });
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.productsList = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket', 'Sauce Labs Onesie', 'Test.allTheThings() T-Shirt (Red)'];
    }

    async goto() {
        await this.page.goto('/inventory.html');
    }

    async getProductNames() {
        return await this.products.evaluateAll(list => list.map(element => element.textContent));
    }

    async getItemPriceList() {
        let priceLists = await this.itemPriceList.evaluateAll(list => list.map(element => element.textContent));
        return priceLists.map(s => s.slice(1)).map(i => Number(i))
    }

    async addItemToCart(itemName) {
        const addToCart = '#add-to-cart-' + itemName.replaceAll(' ', '-')
        const removeItemFromCart = '#remove-' + itemName.replaceAll(' ', '-')
        await this.page.click(addToCart.toLowerCase());
        await this.page.isVisible(removeItemFromCart.toLowerCase())
    }

    async isSortedByName(dataList, sortedInAscending) {
        return dataList.every(function(x, i) {
            if (sortedInAscending) {
                return i === 0 || x >= dataList[i - 1];
            } else {
                return i === 0 || x <= dataList[i - 1];
            }
        });
    }

    async clickHamburgerMenu() {
        await this.buttonBurgerMenu.click()
    }


    async validateAppStateReset() {
        await this.clickHamburgerMenu();
        this.restAppState.click()
        try {
            // Wait for items in the cart to disappear
            await this.page.waitForSelector('.shopping_cart_badge', { state: 'detached' })
        } catch (error) {
            expect(false, 'Items in cart are not cleared of App state is reset').toBeTruthy();
        }
    }

    async verifyDisplayedItems() {
        const nameList = await this.getProductNames();
        console.log(nameList)
        return nameList.filter(item => !this.productsList.includes(item));
    }
}