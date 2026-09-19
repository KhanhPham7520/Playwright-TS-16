import { expect, test } from "@playwright/test";
import {
    ADMIN_HOST,
    ADMIN_PASSWORD,
    ADMIN_USERNAME,
} from "../../../src/utils/constants-utils";
import { LoginPage } from "../../../src/pages/login-page";
import { DashboardPage } from "../../../src/pages/dashboard-page";
import { invalidLoggedInData } from "../../../data/data/login/login-data";

let loginPage: LoginPage;
let dashboardPage: DashboardPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await page.goto(ADMIN_HOST);
});

test("Verify login successful ", async () => {
    await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);
    await dashboardPage.onPage();
});

for (let input of invalidLoggedInData) {
    test(`Verify login failed when username is '${input.email}' and password is '${input.password}' `, async () => {
        await loginPage.login(input.email, input.password);
        for (let item of input.expected) {
            await loginPage.verifyFieldErrorMessageByLabel(
                item.field,
                item.message,
            );
        }
    });
}

test("Verify login failed when password is empty", async () => {
    await loginPage.login("khanhpham", "");
    
    await loginPage.verifyFieldErrorMessageByLabel("Email","This field can not be empty");
    await loginPage.verifyFieldErrorMessageByLabel("Password","This field can not be empty");
});

// test("Verify login failed when username is invalid", async ({ page }) => {
//     await inputTextboxByLabel("Email", "khanhpham", page);
//     await inputTextboxByLabel("Password", "1234567890", page);
//     await clickButtonByLabel("SIGN IN", page);
//     await verifyFieldErrorMessageByLabel("Email", "Invalid email", page);
// });
