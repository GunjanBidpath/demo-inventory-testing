# Test info

- Name: PRODUCT CURD SUITE >> Verify deleting product
- Location: E:\Learning\inventory-management\inventorytrack-testing\tests\Smoke\products\productCRUD.spec.ts:55:10

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveCount(expected)

Locator: locator('//*[@data-testid=\'product-card\']')
Expected: 10
Received: 9
Call log:
  - expect.toHaveCount with timeout 5000ms
  - waiting for locator('//*[@data-testid=\'product-card\']')
    8 × locator resolved to 9 elements
      - unexpected value "9"

    at E:\Learning\inventory-management\inventorytrack-testing\tests\Smoke\products\productCRUD.spec.ts:59:53
```

# Page snapshot

```yaml
- heading "Add Product" [level=1]
- textbox "Product Name"
- textbox "SKU"
- spinbutton
- spinbutton
- textbox "Category ID"
- button "Add Product"
- list:
  - listitem:
    - text: "Levis Blue Denims SKU: lvs-b-dnm-25 Price: ₹89 | Stock: 100 5/12/2025, 9:45:58 PM"
    - button "Edit"
    - button "Delete"
  - listitem:
    - text: "Nike T-shirt SKU: nk-tsht-01 Price: ₹29 | Stock: 150 5/12/2025, 9:45:58 PM"
    - button "Edit"
    - button "Delete"
  - listitem:
    - text: "Adidas Sneakers SKU: add-snk-90 Price: ₹120 | Stock: 75 5/12/2025, 9:45:58 PM"
    - button "Edit"
    - button "Delete"
  - listitem:
    - text: "Wireless Mouse SKU: elec-mou-77 Price: ₹25 | Stock: 200 5/12/2025, 9:45:58 PM"
    - button "Edit"
    - button "Delete"
  - listitem:
    - text: "Mechanical Keyboard SKU: elec-key-44 Price: ₹85 | Stock: 120 5/12/2025, 9:45:58 PM"
    - button "Edit"
    - button "Delete"
  - listitem:
    - text: "27-inch Monitor SKU: elec-mon-01 Price: ₹200 | Stock: 60 5/12/2025, 9:45:58 PM"
    - button "Edit"
    - button "Delete"
  - listitem:
    - text: "Atomic Habits SKU: book-ah-01 Price: ₹18 | Stock: 300 5/12/2025, 9:45:58 PM"
    - button "Edit"
    - button "Delete"
  - listitem:
    - text: "The Alchemist SKU: book-ta-02 Price: ₹15 | Stock: 250 5/12/2025, 9:45:58 PM"
    - button "Edit"
    - button "Delete"
  - listitem:
    - text: "Clean Code SKU: book-cc-03 Price: ₹32 | Stock: 180 5/12/2025, 9:45:58 PM"
    - button "Edit"
    - button "Delete"
- button "Open Next.js Dev Tools":
  - img
- alert
```

# Test source

```ts
   1 |
   2 | import { Page, test, Browser, expect } from '@playwright/test';
   3 | import { ProductPage } from '../../../pages/productPage';
   4 |
   5 |
   6 | test.describe("PRODUCT CURD SUITE", () => {
   7 |
   8 |     var page: Page;
   9 |     var productPage: ProductPage;
  10 |     var newProduct = {
  11 |         name: "Gucci Tshirt",
  12 |         sku: "gc-blk-1",
  13 |         price: "800",
  14 |         qty: "30",
  15 |         categoryId: "e2c7b93d-b122-4d16-9d2f-4e8ce73eb6df"
  16 |     }
  17 |     
  18 |     test.beforeAll(async ({browser}) => {
  19 |         
  20 |         page = await browser.newPage()
  21 |         await page.goto("/products");
  22 |         productPage = new ProductPage(page);
  23 |     })
  24 |
  25 |     test("Verify Products Page", async () => {
  26 |         await expect(productPage.getProductNameTextBox()).toBeVisible();
  27 |         await expect(productPage.getSKUTextBox()).toBeVisible();
  28 |         await expect(productPage.getPriceTextBox()).toBeVisible();
  29 |         await expect(productPage.getStockQuantityTextBox()).toBeVisible();
  30 |         await expect(productPage.getCategoryIdTextBox()).toBeVisible();
  31 |         await expect(productPage.getSubmitButton()).toBeVisible();
  32 |
  33 |         await expect(productPage.getProductCards().nth(0)).toBeVisible();
  34 |         await expect(productPage.getProductCards()).toHaveCount(9);
  35 |     })
  36 |
  37 |     test('Verify Adidas Sneakers exists', async () => {
  38 |         await expect(productPage.getProductCardByName('Adidas Sneakers')).toBeVisible();
  39 |     })
  40 |
  41 |     test.only('Verify Adding New Product', async () => {
  42 |         await productPage.getProductNameTextBox().fill(newProduct.name);
  43 |         await productPage.getSKUTextBox().fill(newProduct.sku);
  44 |         await productPage.getPriceTextBox().fill(newProduct.price);
  45 |         await productPage.getStockQuantityTextBox().fill(newProduct.qty);
  46 |         await productPage.getCategoryIdTextBox().fill(newProduct.categoryId);
  47 |         await productPage.getSubmitButton().click();
  48 |
  49 |         await expect(productPage.getProductCards()).toHaveCount(10);
  50 |         await expect(productPage.getProductCardByName(newProduct.name)).toBeVisible();
  51 |
  52 |         await page.waitForTimeout(6000);
  53 |     })
  54 |
  55 |     test.only('Verify deleting product', async () => {
  56 |         page.once("dialog", dialog => dialog.accept());
  57 |         await productPage.getProductDeleteLink(productPage.getProductCardByName(newProduct.name)).click();
  58 |         await expect(productPage.getProductCardByName(newProduct.name)).not.toBeVisible();
> 59 |         await expect(productPage.getProductCards()).toHaveCount(10);
     |                                                     ^ Error: Timed out 5000ms waiting for expect(locator).toHaveCount(expected)
  60 |     })
  61 | })
```