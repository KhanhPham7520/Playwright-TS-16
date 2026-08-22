import { Page } from "@playwright/test";
import { CommonPage } from "../common";

export class EditProductPage extends CommonPage {

    constructor(page: Page) {
        super(page);
    }

    async onpage(productName: string) {

    }
}