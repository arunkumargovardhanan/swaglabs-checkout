const { test, expect } = require('@playwright/test');
const { ProductsDetailPage } = require('../pages/products-page');
const { CartPage } = require('../pages/cart-page');
const { CheckOut } = require('../pages/checkout-page');
const { CheckOutOverview } = require('../pages/checkoutOverview-page');
test.use({ storageState: 'tests/state.json' });

test('Verify clicking continue button on Checkout page, without Customer information throws informative an error message', async({ page }) => {
    const productsDetailPage = new ProductsDetailPage(page);
    const cartPage = new CartPage(page);
    const checkOutPage = new CheckOut(page);
    await productsDetailPage.goto();
    const productList = await productsDetailPage.getProductNames();
    await productsDetailPage.addItemToCart(productList[0]);
    await cartPage.goto();
    await cartPage.clickCheckOut();
    await expect(checkOutPage.getFirstName()).toBeVisible();
    await checkOutPage.clickCheckOut();
    await checkOutPage.verifyErrorMessage();
});

test('Verify clicking continue button on Checkout page, order review page', async({ page }) => {
    const productsDetailPage = new ProductsDetailPage(page);
    const cartPage = new CartPage(page);
    const checkOutPage = new CheckOut(page);
    const checkOutOverview = new CheckOutOverview(page);
    await productsDetailPage.goto();
    const productList = await productsDetailPage.getProductNames();
    await productsDetailPage.addItemToCart(productList[0]);
    await cartPage.goto();
    await cartPage.clickCheckOut();
    await expect(checkOutPage.getFirstName()).toBeVisible();
    await checkOutPage.fillFirstName('Sam');
    await checkOutPage.fillLastName('Curran');
    await checkOutPage.enterZip('31008');
    await checkOutPage.clickCheckOut();
    await checkOutOverview.verifyPageTitle();
    await checkOutOverview.clickFinish();
});