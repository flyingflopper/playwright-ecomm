import { test } from "../../fixtures/fixturesBase";
import { expect } from "@playwright/test";

test.describe("Checkout Tests", () => {
  test.beforeEach(async ({ page, checkoutPage }) => {
    await checkoutPage.gotoCheckoutPage();
  });

  test("Enter details and complete checkout", async ({ checkoutPage, page }) => {
    await checkoutPage.fillLoggedInDetails("John", "Doe", "9827722");
    await checkoutPage.fillBillingDetails("123 Sing", "London", "SW1A 1AA", "United Kingdom", "Greater London");
    await checkoutPage.completeLoggedInCheckout();
    await expect(page).toHaveURL(/route=extension\/maza\/checkout\/confirm/);
    await expect(page.locator("h1.page-title")).toHaveText("Confirm Order");

    await checkoutPage.confirmOrder();
    await expect(page).toHaveURL(/route=checkout\/success/);
  });
});
