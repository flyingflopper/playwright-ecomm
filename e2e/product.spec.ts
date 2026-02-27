import { expect } from "@playwright/test";
import { test } from "../fixtures/fixturesBase";

test.describe("Product tests", () => {
  test("Verify product details page", async ({ page, homePage, productListingPage }) => {
    await homePage.gotoRandomCategory();
    await page.pause(); // Pause to observe the category page
    await productListingPage.applyPriceFilter(100, 500);
  });
});