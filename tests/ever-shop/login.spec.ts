import { expect, Page, test } from "@playwright/test";
import { invalidLoggedInData } from "../../data/upload/login/login-data";


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

async function inputTextboxByLabel(label: string, input: string, page: Page) {
    let xpath = `(//label[normalize-space()='${label}']/following::input)[1]`;
    let inputLocator = page.locator(xpath);
    await inputLocator.click();
    await inputLocator.clear();
    await inputLocator.fill(input);
}

async function clickButtonByLabel(label: string, page: Page) {
    let xpath = `//*[(@role='button' or self::button or self::input) and (normalize-space()='${label}' or @value='${label}')]`;
    await page.locator(xpath).click();
}

async function verifyFieldErrorMessageByLabel(label: string, message: string, page: Page) {
    let xpath = `//label[normalize-space()='${label}']/following::div[contains(concat(' ', @class, ' '),'field-error') and (normalize-space()='${message}')]`;
    await expect(page.locator(xpath)).toBeVisible();
}