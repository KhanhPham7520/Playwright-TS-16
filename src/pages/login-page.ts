import { expect, Page } from "@playwright/test";
import { CommonPage } from "./common-page";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../utils/constants-utils";

export class LoginPage extends CommonPage {
    constructor(page: Page) {
        super(page);
    }

    async login(username: string, password: string) {
        await this.inputTextboxByLabel("Email", username);
        await this.inputTextboxByLabel("Password", password);
        await this.clickButtonByLabel("SIGN IN");
    }

    async verifyFieldErrorMessageByLabel(label: string, message: string) {
        let xpath = `//label[normalize-space()='${label}']/following::div[contains(concat(' ', @class, ' '),'field-error') and (normalize-space()='${message}')]`;
        await expect(this.page.locator(xpath)).toBeVisible();
    }
}
