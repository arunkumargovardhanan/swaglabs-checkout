const { test, expect } = require('@playwright/test');
const { ProductsDetailPage } = require('../pages/products-page');
const { CartPage } = require('../pages/cart-page');
const { CheckOut } = require('../pages/checkout-page');
const { CheckOutOverview } = require('../pages/checkoutOverview-page');
const { OrderConfirmation } = require('../pages/orderConfirmation');
test.use({ storageState: 'tests/state.json' });

test('Verify the products in the overview page are accurate and upon clicking FINISH button navigates to order confirmation page', async({ page }) => {
    const productsDetailPage = new ProductsDetailPage(page);
    const cartPage = new CartPage(page);
    const checkOutPage = new CheckOut(page);
    const checkOutOverview = new CheckOutOverview(page);
    const orderConfirmation = new OrderConfirmation(page);
    await productsDetailPage.goto();
    const productList = await productsDetailPage.getProductNames();
    const cartItems = [productList[0], productList[1]];
    await productsDetailPage.addItemToCart(cartItems[0]);
    await productsDetailPage.addItemToCart(cartItems[1]);
    await cartPage.goto();
    await cartPage.clickCheckOut();
    await expect(checkOutPage.getFirstName()).toBeVisible();
    await checkOutPage.fillFirstName('Sam');
    await checkOutPage.fillLastName('Curran');
    await checkOutPage.enterZip('31008');
    await checkOutPage.clickCheckOut();
    await checkOutOverview.verifyPageTitle();
    expect(checkOutOverview.verifyItemsInCart(cartItems)).toBeTruthy();
    await checkOutOverview.clickFinish();
    await orderConfirmation.verifyPageTitle();
    await orderConfirmation.verifyOrderConfirmationMessage();

});