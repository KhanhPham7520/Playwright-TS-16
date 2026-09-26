import { expect, test } from "@playwright/test";
import {
    ADMIN_PASSWORD,
    ADMIN_USERNAME,
    URL,
} from "../../../src/utils/constants-utils";
import { CommonPage } from "../../../src/pages/common-page";
import { ProductPage } from "../../../src/pages/products-page";
import { EditProductPage } from "../../../src/pages/edit-product-page";
import { LoginPage } from "../../../src/pages/login-page";
import { NewProductPage } from "../../../src/pages/new-product-page";
import { DashboardPage } from "../../../src/pages/dashboard-page";

let newProductPage: NewProductPage;
let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let productPage: ProductPage;
let editProductPage: EditProductPage;

test.beforeEach(async ({ page }) => {
    newProductPage = new NewProductPage(page);
    productPage = new ProductPage(page);
    dashboardPage = new DashboardPage(page);
    editProductPage = new EditProductPage(page);

    await page.goto(URL);
});

test("Verify create new product successful", async ({ page }) => {
    let commonPage = new CommonPage(page);
    let loginPage = new LoginPage(page);

    //Login
    await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);

    //Verify user on Dashboard page
    let dashboardHeaderXpath =
        "//h1[contains(concat('', @class, ''), 'page-heading-title')]";
    await expect(page.locator(dashboardHeaderXpath)).toBeVisible();
    await commonPage.clickMenuItemByLabel("New Product");

    //Verify user on New Product page
    let newProductHeaderXpath = "//a[normalize-space()='New Product']";
    await expect(page.locator(newProductHeaderXpath)).toBeVisible();

    //Input product's info
    const random = new Date().getTime();

    const productName = `Iphone ${random}`;
    const sku = `SKU-${random}`;

    await commonPage.inputTextboxByLabel("Name", `Iphone ${random}`);
    await commonPage.inputTextboxByLabel("SKU", `SKU-${random}`);
    await commonPage.inputTextboxByLabel("Price", "1500");
    await commonPage.inputTextboxByLabel("Weight", "0.05");
    await commonPage.selectDropdownItemByLabel("Tax class", "Taxable Goods");
    await newProductPage.uploadProductImage(
        "/data/data/upload/iPhone-16-pro.webp",
    );
    await commonPage.selectRadioButtonByLabel("Status", "Disabled");
    await commonPage.selectRadioButtonByLabel("Visibility", "Not visible");
    await commonPage.selectRadioButtonByLabel("Manage stock?", "No");
    await commonPage.selectRadioButtonByLabel("Stock availability", "No");
    await commonPage.inputTextboxByLabel("Quantity", "100");
    await commonPage.selectDropdownItemByLabel("Attribute group", "Default");
    await commonPage.selectDropdownItemByLabel("Color", "Black");
    await commonPage.selectDropdownItemByLabel("Size", "XXL");

    await commonPage.inputTextboxByLabel(
        "Url key",
        `iphone-18-pro-max-${random}`,
    );
    await commonPage.inputTextboxByLabel("Meta title", "Iphone 18 Pro Max");
    await commonPage.inputTextboxByLabel("Meta keywords", "Iphone 18 pro max");
    await commonPage.inputTextboxByLabel(
        "Meta description",
        "Iphone 18 pro max description",
    );

    await commonPage.clickButtonByLabel("Save");
    await commonPage.verifyNotificationMessage("Product saved successfully!");

    await commonPage.clickMenuItemByLabel("Products");
    await productPage.onPage();
    await productPage.searchProduct(productName);
    await productPage.selectProductByName(productName);
    await editProductPage.onPage(productName);

    expect(await editProductPage.getTextboxValueByLabel("Name")).toEqual(productName);
    expect(await editProductPage.getTextboxValueByLabel("SKU")).toEqual(sku);
    expect(await editProductPage.getTextboxValueByLabel("Price")).toEqual("1500");
    expect(await editProductPage.getTextboxValueByLabel("Weight")).toEqual("0.05");
});
