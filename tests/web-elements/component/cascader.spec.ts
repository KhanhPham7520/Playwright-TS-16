import test, { expect, Page } from "@playwright/test";

test('Verify cascader', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/cascader');
    await selectCascaderByLabel('Cascader', ['Test', 'With', 'You'], page);
    await expect(page.getByText(`Current Value: Test, With, You`)).toBeVisible();
});

async function selectCascaderByLabel(label: string, steps: string[], page: Page) {
    let xpathCascader = `//div[@role="separator" and normalize-space()="${label}"]/following::input[1]`;
    await page.locator(xpathCascader).click();
    for (let i = 0; i < steps.length; i++) {
        let xpath = `//ul[${i + 1}]//li[@role='menuitemcheckbox' and normalize-space()='${steps[i]}']`;
        await page.locator(xpath).click();
    }

}