import { expect, Page, test } from "@playwright/test";

test.beforeEach('Before', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/input');
})

test('Verify normal input', async ({ page }) => {
    await inputTextboxByLabel('Normal Input', 'Test With Me', page);
    await expect(page.getByText('Value: Test With Me')).toBeVisible();
});

test('Verify Input Number', async ({ page }) => {
    await inputTextboxByLabel('Input Number', "30", page);
    await expect(page.getByText('Value: 30')).toBeVisible();
});

test(`Verify password box`, async ({ page }) => {;
    await inputTextboxByLabel('Password Box', "1234567890", page);
    await expect(page.getByText('Value: 1234567890')).toBeVisible();
})

async function inputTextboxByLabel(label: string, value: string, page: Page) {
    let xpath = `//div[@role='separator' and normalize-space()='${label}']/following::input[1]`;
    await page.locator(xpath).fill(value);
}

async function inputTextAreaByLabel(label: string, value: string, page: Page) {
    let xpath = `//div[@role='separator' and normalize-space()='${label}']/following::textarea[1]`;
    await page.locator(xpath).fill(value);
}