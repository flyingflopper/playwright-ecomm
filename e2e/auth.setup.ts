import { test as setup } from "@playwright/test";

setup("Save logged in state with an item in cart", async ({ page }) => {
  await page.goto(process.env.LOGIN_URL!);
  await page.locator("#input-email").fill(process.env.AUTH_EMAIL!);
  await page.locator("#input-password").fill(process.env.AUTH_PASSWORD!);
  await page.locator('input[value="Login"]').click();

  await page.waitForURL("**/index.php?route=account/account");
  await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=47");
  await page.locator('button.button-cart[title="Add to Cart"]').filter({ visible: true }).click();

  await page.locator("#notification-box-top .toast").waitFor({ state: "visible" });

  // Save storage state
  await page.context().storageState({ path: "utils/auth/user.json" });
});
