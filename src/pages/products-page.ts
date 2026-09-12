import { Page } from "@playwright/test";


export class productPage {
    page: Page;

    constructor(page:Page){
        this.page = page;
    }
}
