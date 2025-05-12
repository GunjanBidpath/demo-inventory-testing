
import { Page, test, Browser, expect } from '@playwright/test';
import { ProductPage } from '../../../pages/productPage';


test.describe("PRODUCT CURD SUITE", () => {

    var page: Page;
    var productPage: ProductPage;
    var newProduct = {
        name: "Gucci Tshirt",
        sku: "gc-blk-1",
        price: "800",
        qty: "30",
        categoryId: "e2c7b93d-b122-4d16-9d2f-4e8ce73eb6df"
    }
    
    test.beforeAll(async ({browser}) => {
        
        page = await browser.newPage()
        await page.goto("/products");
        productPage = new ProductPage(page);
    })

    test("Verify Products Page", async () => {
        await expect(productPage.getProductNameTextBox()).toBeVisible();
        await expect(productPage.getSKUTextBox()).toBeVisible();
        await expect(productPage.getPriceTextBox()).toBeVisible();
        await expect(productPage.getStockQuantityTextBox()).toBeVisible();
        await expect(productPage.getCategoryIdTextBox()).toBeVisible();
        await expect(productPage.getSubmitButton()).toBeVisible();

        await expect(productPage.getProductCards().nth(0)).toBeVisible();
        await expect(productPage.getProductCards()).toHaveCount(9);
    })

    test('Verify Adidas Sneakers exists', async () => {
        await expect(productPage.getProductCardByName('Adidas Sneakers')).toBeVisible();
    })

    test('Verify Adding New Product', async () => {
        await productPage.getProductNameTextBox().fill(newProduct.name);
        await productPage.getSKUTextBox().fill(newProduct.sku);
        await productPage.getPriceTextBox().fill(newProduct.price);
        await productPage.getStockQuantityTextBox().fill(newProduct.qty);
        await productPage.getCategoryIdTextBox().fill(newProduct.categoryId);
        await productPage.getSubmitButton().click();

        await expect(productPage.getProductCards()).toHaveCount(10);
        await expect(productPage.getProductCardByName(newProduct.name)).toBeVisible();

        await page.waitForTimeout(6000);
    })

    test('Verify deleting product', async () => {
        page.once("dialog", dialog => dialog.accept());
        await productPage.getProductDeleteLink(productPage.getProductCardByName(newProduct.name)).click();
        await expect(productPage.getProductCardByName(newProduct.name)).not.toBeVisible();
        await expect(productPage.getProductCards()).toHaveCount(9);
    })
})