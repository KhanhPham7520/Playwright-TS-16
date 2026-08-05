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

test(`Verify password box`, async ({ page }) => {
    ;
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

test('Verify half rating', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/rating');
    await selectHalfRatingByLabel('Half Rate', '3.5', page);
    await expect(page.getByText('Current rating: 3.5').first()).toBeVisible();
});



async function selectHalfRatingByLabel(label: string, rate: string, page: Page) {
    let rateXpath = `(//div[@role='separator' and normalize-space()='${label}']//following::ul[contains(concat(' ', @class, ' '), ' ant-rate ')])[1]`;

    let rateLocator = page.locator(rateXpath);
    let currentFullRating = await rateLocator.locator('.ant-rate-star-full').count();
    let currentHalfRating = await rateLocator.locator('.ant-rate-star-half').count();
    let currentRating = currentHalfRating > 0 ? currentFullRating + 0.5 : currentFullRating;

    let rateNumber = Number.parseFloat(rate);

    if (currentRating != rateNumber) {
        if (Number.isInteger(rateNumber)) {
            await rateLocator
                .locator(`li:nth-child(${rateNumber}) .ant-rate-star-second`)
                .click();
        } else {
            await rateLocator
                .locator(`li:nth-child(${0.5 + rateNumber}) .ant-rate-star-first`)
                .click();
        }
    }
}