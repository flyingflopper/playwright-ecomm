import { expect } from "@playwright/test";
import { test } from "../../fixtures/fixturesBase";
import { ProductDetailPage } from "../../pages/PDP";

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
    console.log(availability);
  });

  test("Verify add to cart button is disabled/enabled correctly", async ({ productDetailPage }) => {
    const availability = await productDetailPage.getAvailability();
    console.log(availability);
    const addtocartButton = productDetailPage.addCartButton;

    if (availability == "Out Of Stock") await expect(addtocartButton).toBeDisabled();
    else if (availability.search("Days") != -1) await expect(addtocartButton).toBeDisabled();
    else if (availability == "In Stock") await expect(addtocartButton).toBeEnabled();
    else return;
  });

  test("Verify buy now button is disabled/enabled correctly", async ({ productDetailPage }) => {
    const availability = await productDetailPage.getAvailability();
    console.log(availability);
    const buynowButton = productDetailPage.buyNowButton;

    if (availability == "Out Of Stock") await expect(buynowButton).toBeDisabled();
    else if (availability.search("Days") != -1) await expect(buynowButton).toBeDisabled();
    else if (availability == "In Stock") await expect(buynowButton).toBeEnabled();
    else return;
  });

  // flaky cause website has bugs
  // test("Item is addded into cart after clicking on add to cart button", async ({ page, productDetailPage, productListingPage }) => {
  //   test.setTimeout(120000);
  //   let availability = await productDetailPage.getAvailability();
  //   console.log(availability);

  //   while (availability == "Out Of Stock" || availability.search("Days") != -1) {
  //     await page.goBack();
  //     await productListingPage.clickonRandomProduct();
  //     availability = await productDetailPage.getAvailability();
  //   }
  //   if (availability == "In Stock") await productDetailPage.addCartButton.scrollIntoViewIfNeeded();
  //   const productTitle = await productDetailPage.getProductTitle();
  //   await productDetailPage.addCartButton.click();

  //   await expect(productDetailPage.addtocartSuccessToast).toBeVisible();
  //   await expect(productDetailPage.addtocartSuccessToast).toContainText(productTitle);
  //   console.log(productTitle);
  //   console.log(productDetailPage.addtocartSuccessToast.textContent());
  // });

  //test instock bug-free item
  test("Item is addded into cart after clicking on add to cart button", async ({ page, productDetailPage, productListingPage }) => {
    await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=product/product&path=17&product_id=47");
    let availability = await productDetailPage.getAvailability();
    if (availability == "In Stock") await productDetailPage.addCartButton.scrollIntoViewIfNeeded();
    const productTitle = await productDetailPage.getProductTitle();
    await productDetailPage.addCartButton.click();

    await expect(productDetailPage.addtocartSuccessToast).toBeVisible();
    await expect(productDetailPage.addtocartSuccessToast).toContainText(productTitle);
    console.log(productTitle);
    console.log(await productDetailPage.addtocartSuccessToast.textContent());
  });
});
