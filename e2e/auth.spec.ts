import { expect } from "@playwright/test";
import { test } from "../fixtures/fixturesBase";
import { RegisterPage } from "../pages/registerPage";
import { LoginPage } from "../pages/loginPage";

test.describe("Registration tests", () => {
  test("User Register successfully", async ({ page, userEmail }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    await registerPage.register("John", "Doe", userEmail, "82228333", "Password123", true, true);
    await expect(registerPage.registerSuccessMsg).toBeVisible();
  });

  test("User tries to register with invalid email", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    await registerPage.register("John", "Doe", "certain.loon.qgwq@hidingmail", "82228333", "Password123", true, true);
    await expect(registerPage.invalidEmailErrorMsg).toBeVisible();
  });

  test("User tries to register without agreeing to privacy policy", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    await registerPage.register("John", "Doe", "certain.loon.qgwq@hidingmail.com", "82228333", "Password123", true, false);
    await expect(registerPage.subscribeErrorMsg).toBeVisible();
  });

  test("User registers and logins successfully", async ({ page, userEmail }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    await test.step("Register new user", async () => {
      await registerPage.navigate();
      await registerPage.register("John", "Doe", userEmail, "82228333", "Password123", true, true);
    });

    await test.step("Login with registered user", async () => {
      await loginPage.navigate();
      await loginPage.login(userEmail, "Password123");
      await expect(page.getByRole("heading", { name: "My Account" })).toBeVisible();
    });
  });
});

test.describe("Login tests", () => {
  test("User Login successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login("certain.loon.qgwq@hidingmail.com", "Password123");
    await expect(page.getByRole("heading", { name: "My Account" })).toBeVisible();
  });

  test("User Login failed with wrong email", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login("certain.loon.qgwq@hidingmail.com1", "Password123");
    await expect(loginPage.loginErrorMsg.or(loginPage.rateErrorMsg)).toBeVisible();
  });

  test("User Login failed with wrong password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login("certain.loon.qgwq@hidingmail.com", "Password1234");
    await expect(loginPage.loginErrorMsg.or(loginPage.rateErrorMsg)).toBeVisible();
  });

  test("User Login failed with invalid email format", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login("certain.loon.qgwqhidingmail.com", "Password123");
    await expect(loginPage.loginErrorMsg.or(loginPage.rateErrorMsg)).toBeVisible();
  });
});
