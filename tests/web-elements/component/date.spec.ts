import { expect, Page, test } from "@playwright/test";

test.beforeEach("Before", async ({ page }) => {
    await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/elements/date-time");
})

test("Verify timepicker", async ({ page }) => {
    await expect(page.getByText(`Value: Test With Me`)).toBeVisible();
})

async function selectTimePicker(label: string, hour:string, minutes:string ,page: Page) {
    let timepickerXpath = `//div[contains(concat(' ', @class, ' '), ' ant-divider ') and contains(normalize-space(), '${label}')]/following::div[contains(concat(' ', @class, ' '), ' ant-picker ')][1]`;
    let timepicker = page.locator(timepickerXpath);
    await timepicker.click();

    let hourXpath = ``;
    await page.locator(hourXpath).click();

    let minuteXpath = "";
    await page.locator(minuteXpath).click();

}