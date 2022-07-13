const { test, expect } = require('@playwright/test');
const { ProductsDetailPage } = require('../pages/products-page');
const { CartPage } = require('../pages/cart-page');
const { CheckOut } = require('../pages/checkout-page');
test.use({ storageState: 'tests/state.json' });

test('Verify clicking on remove button clears the product from cart page', async({ page }) => {
    const productsDetailPage = new ProductsDetailPage(page);
    const cartPage = new CartPage(page);
    await productsDetailPage.goto();
    const productList = await productsDetailPage.getProductNames();
    await productsDetailPage.addItemToCart(productList[0]);
    await cartPage.goto();
    await cartPage.removeItemFromCart();
});


test('Verify clicking on CHECKOUT button navigates to Checkout Page', async({ page }) => {
    const productsDetailPage = new ProductsDetailPage(page);
    const cartPage = new CartPage(page);
    const checkOutPage = new CheckOut(page);
    await productsDetailPage.goto();
    const productList = await productsDetailPage.getProductNames();
    await productsDetailPage.addItemToCart(productList[0]);
    await cartPage.goto();
    await cartPage.clickCheckOut();
    await expect(checkOutPage.getFirstName()).toBeVisible()
});

test('Verify items added in products page are appearing in cart page', async({ page }) => {
    const productsDetailPage = new ProductsDetailPage(page);
    const cartPage = new CartPage(page);
    await productsDetailPage.goto();
    const productList = await productsDetailPage.getProductNames();
    const itemPriceList = await productsDetailPage.getItemPriceList();
    const cartItems = [productList[0], productList[1]];
    await productsDetailPage.addItemToCart(cartItems[0]);
    await productsDetailPage.addItemToCart(cartItems[1]);
    await cartPage.goto();
    expect(cartPage.verifyItemsInCart(cartItems)).toBeTruthy();
});