const { test, expect } = require('@playwright/test');
const { ProductsDetailPage } = require('../pages/products-page');
test.use({ storageState: 'tests/state.json' });

test('Products page verification', async({ page }) => {
    const productsDetailPage = new ProductsDetailPage(page);
    await productsDetailPage.goto();
    const productList = await productsDetailPage.getProductNames()
    const itemPriceList = await productsDetailPage.getItemPriceList()
    expect(productList).toHaveCount(6);
    expect(productsDetailPage.verifyDisplayedItems()).toBeTruthy();
});

test('Verify clicking Add To Cart button adds the item to Cart and Add To Cart button is replaced by Remove button', async({ page }) => {
    const productsDetailPage = new ProductsDetailPage(page);
    await productsDetailPage.goto();
    const productList = await productsDetailPage.getProductNames()
    await productsDetailPage.addItemToCart(productList[0]);
})

test('Verify items in Products page are displayed based on selected Sort Order', async({ page }) => {
    const productsDetailPage = new ProductsDetailPage(page);
    await productsDetailPage.goto();
    const areItemsSortedByName = await productsDetailPage.isSortedByName(await productsDetailPage.getProductNames(), true);
    expect(areItemsSortedByName, 'Products sorted by Name in Ascending').toBeTruthy();
    await page.selectOption('.product_sort_container', 'lohi');
    const areItemsSortedByPrice = await productsDetailPage.isSortedByName(await productsDetailPage.getItemPriceList(), true);
    expect(areItemsSortedByPrice, 'Products sorted by Price Low to High').toBeTruthy();
    await page.selectOption('.product_sort_container', 'hilo');
    const areItemsSortedByPriceHighToLow = await productsDetailPage.isSortedByName(await productsDetailPage.getItemPriceList(), false);
    expect(areItemsSortedByPriceHighToLow, 'Products sorted by Price High to Low').toBeTruthy();
})

test('Verify clicking on "Reset App State" button on Menu bar clears items from cart', async({ page }) => {
    const productsDetailPage = new ProductsDetailPage(page);
    await productsDetailPage.goto();
    const productList = await productsDetailPage.getProductNames()
    await productsDetailPage.addItemToCart(productList[0]);
    await productsDetailPage.validateAppStateReset()
})