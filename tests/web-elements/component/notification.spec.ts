import { expect, Page, test } from "@playwright/test";
import path from "path";

test('Verify notification', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/notification');
    await clickButtonByLabel('Success', page);
    await expect((page.getByText(`Status: OK`)));
});

async function verifyNotificationMessage(title: string, description: string, page: Page) {
    let titleLocator = `//div[@role="alert"]//div[contains(concat(" ", @class, " "), " ant-notification-notice-title ")]`;
    expect(await page.locator(titleLocator).textContent()).toBe(title);

    let descriptionLocator = `//div[@role="alert"]//div[contains(concat(" ", @class, " "), " ant-notification-notice-description")]`;
    expect(await page.locator(descriptionLocator).textContent()).toBe(title);
}

async function clickButtonByLabel(label: string, page: Page) {
    let xpath = `//*[(@role='button' or self::button or self::input) and (normalize-space()='${label}' or @value='${label}')]`;
    await page.locator(xpath).click();
}