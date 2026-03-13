import { test as base } from "@playwright/test";
import { ProductDetailPage } from "../pages/PDP";

type myFixtures = {
    productDetailPage: ProductDetailPage;
}

export const test = base.extend<myFixtures>({
    productDetailPage: async({page}, use) => {
        const productDetailPage = new ProductDetailPage(page);
        await use(productDetailPage);
    }
})