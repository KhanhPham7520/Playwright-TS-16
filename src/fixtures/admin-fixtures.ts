import { test } from "@playwright/test";
import { UIManager } from "../pages/ui-manager";

type AdminFixture = {
    ui: UIManager;
    cookie: string
}

export const adminTest = test.extend<AdminFixture>({

});