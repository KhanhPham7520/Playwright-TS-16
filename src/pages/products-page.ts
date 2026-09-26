import { expect, Page } from "@playwright/test";
import { CommonPage } from "./common-page";

export class ProductPage extends CommonPage {
    searchBoxSelector = "#keyword";

    constructor(page: Page) {
        super(page);
    }

    async onPage() {
        let dashboardHeaderXpath =
            "//div[contains(concat(' ', @class, ' '), ' admin-nav ')]//a[normalize-space()='Products']";
        await expect(this.page.locator(dashboardHeaderXpath)).toBeVisible();
    }

    async searchProduct(input: string) {
        let searchBoxLocator = this.page.locator(this.searchBoxSelector);
        await searchBoxLocator.click();
        await searchBoxLocator.clear();
        await searchBoxLocator.fill(input);
        await this.page.keyboard.press("Enter");
    }

    async selectProductByName(productName: string) {
        let xpathHeader = `//a[normalize-space()='${productName}']`;
        await this.page.locator(xpathHeader).click();
    }
}
