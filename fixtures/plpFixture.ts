import { test as base } from '@playwright/test';
import { ProductListingPage } from '../pages/product';

type myFixtures = {
  productListingPage: ProductListingPage;
}

export const test = base.extend<myFixtures>({
    productListingPage: async ({ page }, use) => {
        const productListingPage = new ProductListingPage(page);
        await use(productListingPage);
    }
})