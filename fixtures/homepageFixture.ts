import { test as base } from "@playwright/test";
import { HomePage } from "../pages/homePage";

type myFixtures = {
    homePage: HomePage;
}

export const test = base.extend<myFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await use(homePage);
    },
});