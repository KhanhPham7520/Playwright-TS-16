import { expect, Page } from "@playwright/test";
import path from "node:path";
import { CommonPage } from "./common-page";

export class NewProductPage extends CommonPage {
    constructor(page: Page) {
        super(page);
    }

    async onPage() {
        let dashboardHeaderXpath =
            "//h1[contains(concat('', @class, ''), 'page-heading-title')]";
        await expect(this.page.locator(dashboardHeaderXpath)).toBeVisible();
    }

    async selectCategory(category: string) {
        await this.page.getByRole("link", { name: "Select category" }).click();
        let searchCategoryInput =
            this.page.getByPlaceholder("Search categories");

        await searchCategoryInput.clear();
        await searchCategoryInput.click();
        await searchCategoryInput.fill(category);

        let searchButtonXpath = `(//span[normalize-space()='${category}']//following::button[normalize-space()='Select'])[1]`;
        await this.page.locator(searchButtonXpath).click();
    }

    async uploadProductImage(filePath: string) {
        let selector = `#images input`;
        let absolutePath = path.join(process.cwd(), filePath);
        await this.page.locator(selector).setInputFiles(absolutePath);
    }
}
