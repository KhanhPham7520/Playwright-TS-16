import { expect, test } from "@playwright/test";
import { invalidLoggedInData } from "../../../data/upload/login/login-data";
import { clickButtonByLabel, inputTextboxByLabel, verifyFieldErrorMessageByLabel } from "../../../src/common";

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/admin/login');
})

test('Verify login successful ', async ({ page }) => {
    await inputTextboxByLabel('Email', "khanhpham7520@gmail.com", page);
    await inputTextboxByLabel('Password', "1234567890", page);
    await clickButtonByLabel('SIGN IN', page);
    let dashboardHeaderXpath = "//h1[contains(concat(' ',@class,' '),' page-heading-title' ) and (normalize-space()='Dashboard')]";
    await expect(page.locator(dashboardHeaderXpath)).toBeVisible();
});

for (let input of invalidLoggedInData) {
    test(`Verify login failed when username is '${input.email}' and password is '${input.password}' `, async ({ page }) => {
        await inputTextboxByLabel('Email', input.email, page);
        await inputTextboxByLabel('Password', input.password, page);
        await clickButtonByLabel('SIGN IN', page);
        for (let item of input.expected) {
            await verifyFieldErrorMessageByLabel(item.field, item.message, page)
        }
    });
}

test('Verify login failed when password is empty', async ({ page }) => {
    await inputTextboxByLabel('Email', 'khanhpham', page);
    await inputTextboxByLabel('Password', '', page);
    await clickButtonByLabel('SIGN IN', page);
    await verifyFieldErrorMessageByLabel('Password', 'This field can not be empty', page)
});

test('Verify login failed when username is invalid', async ({ page }) => {
    await inputTextboxByLabel('Email', 'khanhpham', page);
    await inputTextboxByLabel('Password', '1234567890', page);
    await clickButtonByLabel('SIGN IN', page);
    await verifyFieldErrorMessageByLabel('Email', 'Invalid email', page)
});

