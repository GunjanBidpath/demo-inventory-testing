import { Locator, Page } from "playwright/test";

export class ProductPage {



    constructor(public page: Page) {
        this.page = page;
    }

    getProductCards() {
        return this.page.locator("xpath=//*[@data-testid='product-card']");
    }

    getProductName(productCard: Locator) {
        return productCard.locator("xpath=.//*[@data-testid='product-name']")
    }

    getProductSKU(productCard: Locator) {
        return productCard.locator("xpath=.//*[@data-testid='product-sku']")
    }

    getProductStock(productCard: Locator) {
        return productCard.locator("xpath=.//*[@data-testid='product-stock']")
    }

    getProductDeleteLink(productCard: Locator) {
        return productCard.locator("xpath=.//button[text()='Delete']")
    }

    getProductEditLink(productCard: Locator) {
        return productCard.locator("xpath=.//button[text()='Edit']")
    }

    getProductCardByName(productName: string) {
        return this.page.locator(`xpath=//*[@data-testid='product-card' and .//*[@data-testid='product-name' and text()='${productName}']]`);
    }

    getProductNameTextBox() {
        return this.page.locator(`xpath=//input[@name='name']`)
    }

    getSKUTextBox() {
        return this.page.locator(`xpath=//input[@name='sku']`)
    }

    getPriceTextBox() {
        return this.page.locator(`xpath=//input[@name='price']`)
    }

    getStockQuantityTextBox() {
        return this.page.locator(`xpath=//input[@name='stockQty']`)
    }

    getCategoryIdTextBox() {
        return this.page.locator(`xpath=//input[@name='categoryId']`)
    }

    getSubmitButton() {
        return this.page.locator(`xpath=//button[@type='submit']`)
    }
}