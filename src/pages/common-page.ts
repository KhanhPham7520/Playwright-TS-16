import { expect, Page } from "@playwright/test";
import path from "node:path";

export class CommonPage {
    
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async inputTextboxByLabel(label: string, input: string) {
        let xpathTextbox = `(//label[normalize-space()='${label}']//following::input)[1]`;
        let xpathTextarea = `(//label[normalize-space()='${label}']//following::textarea)[1]`;
        let inputLocator = this.page
            .locator(`${xpathTextbox} | ${xpathTextarea}`)
            .first();

        await inputLocator.click();
        await inputLocator.clear();
        await inputLocator.fill(input);
    }

    async clickButtonByLabel(label: string) {
        let xpath = `//*[(@role='button' or self::button or self::input) and (normalize-space()='${label}' or @value='${label}')]`;
        await this.page.locator(xpath).click();
    }
    async verifyFieldErrorMessageByLabel(
        label: string,
        message: string,
        page: Page,
    ) {
        let xpath = `//label[normalize-space()='${label}']/following::div[contains(concat(' ', @class, ' '),'field-error') and (normalize-space()='${message}')]`;
        await expect(page.locator(xpath)).toBeVisible();
    }
    async clickMenuItemByLabel(label: string) {
        let xpath = `//div[contains(concat('',@class,''), 'admin-nav')]//a[normalize-space()='${label}']`;
        await this.page.locator(xpath).click();
    }

    async selectDropdownItemByLabel(label: string, item: string) {
        let xpath = `(//*[normalize-space()='${label}']//following::select)[1]`;
        await this.page.locator(xpath).selectOption({ label: item });
    }

    async selectCategory(category: string) {
        await this.page.getByRole("link", { name: "Select category" }).click();
        let searchCategoryInput =
            await this.page.getByPlaceholder("Search categories");
        await searchCategoryInput.clear();
        await searchCategoryInput.click();
        await searchCategoryInput.fill(category);
        let selectButtonXpath = `(//h3[normalize-space()='${category}']//following::div[normalize-space()='Select'])[1]`;
        await this.page.locator(selectButtonXpath).click();
    }

    async verifyNotificationMessage(message: string) {
        await expect(this.page.getByRole("alert", { name: message }));
    }

    async selectRadioButtonByLabel(label: string, item: string) {
        let xpath = `(//label[normalize-space()='${label}']//following::div//span[normalize-space()='${item}'])[1]`;
        await this.page.locator(xpath).click();
    }
}
