import { expect } from "@playwright/test";
import { test } from "../../fixtures/fixturesBase";

test.describe("Product Listing tests", () => {
  test.beforeEach("Navigate to random category", async ({ page, homePage, productListingPage }) => {
    await homePage.gotoRandomCategory();
  });

  test("Verify price filter functionality", async ({ productListingPage }) => {
    await productListingPage.applyPriceFilter(100, 500);
    await expect(productListingPage.pricesAreWithinRange(100, 500)).resolves.toBe(true);
  });

  test("Verify sort according to ascending price functionality", async ({ productListingPage }) => {
    await productListingPage.sortBy("Price (Low > High)");
    expect(await productListingPage.checkAscendingPrice()).toBe(true);
  });

  test("Verify sort according to descending price functionality", async ({ productListingPage }) => {
    await productListingPage.sortBy("Price (High > Low)");
    expect(await productListingPage.checkDescendingPrice()).toBe(true);
  });

  test("Verify sort according to Name (A - Z) functionality", async ({ productListingPage }) => {
    await productListingPage.sortBy("Name (A - Z)");
    expect(await productListingPage.checkNameAZ()).toBe(true);
  });

  test("Verify sort according to Name (Z - A) functionality", async ({ productListingPage }) => {
    await productListingPage.sortBy("Name (Z - A)");
    expect(await productListingPage.checkNameZA()).toBe(true);
  });
});

test.describe("Product Details tests", () => {
  test.beforeEach("Navigate to random category and product", async ({ page, homePage, productListingPage }) => {
    await homePage.gotoRandomCategory();
    await productListingPage.clickonRandomProduct();
  });

  test("Check product availability", async ({ productDetailPage }) => {
    const availability = await productDetailPage.getAvailability();
    console.log(availability)
  });
});
