import { Page } from "@playwright/test";
import { NewProductPage } from "./new-product-page";
import { LoginPage } from "./login-page";
import { EditProductPage } from "./edit-product-page";
import { DashboardPage } from "./dashboard-page";
import { ProductsPage } from "./products-page";

export class UIManager {
    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    newProductPage: NewProductPage;
    editProductPage: EditProductPage;
    productsPage: ProductsPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.newProductPage = new NewProductPage(page);
        this.editProductPage = new EditProductPage(page);
        this.productsPage = new ProductsPage(page);
    }
}