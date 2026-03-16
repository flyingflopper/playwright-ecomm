import { test as base } from "@playwright/test";
import { CheckoutPage } from "../pages/checkoutPage";

type myFixtures = {
    checkoutPage : CheckoutPage;
}

export const test = base.extend<myFixtures>({
    checkoutPage: async ({ page },use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    }
})