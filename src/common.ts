import { expect, Page, request, test } from "@playwright/test";


export async function inputTextboxByLabel(label: string, input: string, page: Page) {
    let xpathTextbox = `(//label[normalize-space()='${label}']/following::input)[1]`;
    let xpathTextarea = `(//label[normalize-space()='${label}']/following::textarea)[1]`;

    let inputLocator = page.locator(`${xpathTextbox} | ${xpathTextarea}`).first();
    await inputLocator.click();
    await inputLocator.clear();
    await inputLocator.fill(input);
}

export async function clickButtonByLabel(label: string, page: Page) {
    let xpath = `//*[(@role='button' or self::button or self::input) and (normalize-space()='${label}' or @value='${label}')]`;
    await page.locator(xpath).click();
}
export async function verifyFieldErrorMessageByLabel(label: string, message: string, page: Page) {
    let xpath = `//label[normalize-space()='${label}']/following::div[contains(concat(' ', @class, ' '),'field-error') and (normalize-space()='${message}')]`;
    await expect(page.locator(xpath)).toBeVisible();
}

export async function clickMenuItemByLabel(label: string, page: Page) {
    let xpath = `//div[contains(concat('',@class,''),'admin-navigation')]//a[normalize-space()='${label}']`;
    await page.locator(xpath).click();

}

// async deleteProductById(cookie: string, productId: string) {
//     let req = await request.newContext();

//     await req.delete(`${API_URL}/api/products/${productId}`, {
//         headers: {
//             cookie: cookie
//         }
//     })
// }