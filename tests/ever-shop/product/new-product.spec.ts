import { expect, test } from "@playwright/test";
import { clickButtonByLabel, clickMenuItemByLabel, inputTextboxByLabel } from "../../../src/common";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../../../src/utils/constants-utils";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/admin/login")
});

test('Verify create new product successful', async ({ page }) => {
    //Login
    await inputTextboxByLabel('Email', ADMIN_USERNAME, page);
    await inputTextboxByLabel('Password', ADMIN_PASSWORD, page);
    await clickButtonByLabel('SIGN IN', page);

    //Verify user on Dashboard page
    let dashboardHeaderXpath = "//h1[contains(concat('', @class, ''), 'page-heading-title')]";
    await expect(page.locator(dashboardHeaderXpath)).toBeVisible();
    await clickMenuItemByLabel('New Product', page);

    //Verify user on New Product page
    let newProductHeaderXpath = "//a[normalize-space()='New Product']";
    await expect(page.locator(newProductHeaderXpath)).toBeVisible();

    //Input product's info
    await inputTextboxByLabel('Name', 'Iphone', page);
    await inputTextboxByLabel('SKU', '1234567890', page);
    await inputTextboxByLabel('Price', '1500', page);
    await inputTextboxByLabel('Weight', '0.05', page);
    // await selectDropdownItemByLabel('Tax class', 'Taxable Goods', page);
    // await selectRadioButtonByLabel('Status', 'Disabled', page);
    // await selectRadioButtonByLabel('Visibility', 'Not visible', page);
    // await selectRadioButtonByLabel('Manage stock?', 'No', page);
    // await selectRadioButtonByLabel('Stock availability', 'No', page);
    // await inputTextboxByLabel('Quantity', '100', page);
    // await selectDropdownItemByLabel('Attribute group', 'Default', page);
    // await selectDropdownItemByLabel('Color', 'Black', page);
    // await selectDropdownItemByLabel('Size', 'XXL', page);

    await inputTextboxByLabel('Url key', 'iphone-18-pro-max', page);
    await inputTextboxByLabel('Meta title', 'Iphone 18 Pro Max', page);
    await inputTextboxByLabel('Meta keywords', 'Iphone 18, pro, max', page);
    await inputTextboxByLabel('Meta description', 'Iphone 18 pro max description', page);

    await page.waitForTimeout(1000);
});