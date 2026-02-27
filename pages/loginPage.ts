import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly myaccButton: Locator;
  readonly loginLink: Locator;
  readonly logoutLink: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly registerLink: Locator;
  readonly forgotpassLink: Locator;
  readonly myaccLink: Locator;
  readonly myaddLink: Locator;
  readonly wishLink: Locator;
  readonly orderhhistLink: Locator;
  readonly downloadsLink: Locator;
  readonly recurringLink: Locator;
  readonly rewardsLink: Locator;
  readonly returnsLink: Locator;
  readonly contineButton: Locator;
  readonly forgotpass2Link: Locator;
  readonly loginErrorMsg: Locator;
  readonly rateErrorMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myaccButton = page.getByRole("button", { name: "My Account" });
    this.logoutLink = page.getByRole("link", { name: "Logout", exact: true });
    this.loginLink = page.getByRole("link", { name: "Login" });
    this.emailField = page.getByRole("textbox", { name: "E-Mail Address" });
    this.passwordField = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.registerLink = page.getByRole("link", { name: "Register" });
    this.forgotpassLink = page.getByRole("link", {
      name: "Forgotten Password?",
    });
    this.myaccLink = page.getByRole("link", { name: "My Account" });
    this.myaddLink = page.getByRole("link", { name: "My Addresses" });
    this.wishLink = page.getByRole("link", { name: "Wish List" });
    this.orderhhistLink = page.getByRole("link", { name: "Order History" });
    this.downloadsLink = page.getByRole("link", { name: "Downloads" });
    this.recurringLink = page.getByRole("link", { name: "Recurring Payments" });
    this.rewardsLink = page.getByRole("link", { name: "Reward Points" });
    this.returnsLink = page.getByRole("link", { name: "Returns" });
    this.contineButton = page.getByRole("link", { name: "Continue" });
    this.forgotpass2Link = page.getByRole("link", {
      name: "Forgotten Password?",
    });
    this.loginErrorMsg = page.getByText(
      "Warning: No match for E-Mail Address and/or Password.",
    );
    this.rateErrorMsg = page.getByText(
      "Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.",
    );
  }

  async navigate(url: string = "https://ecommerce-playground.lambdatest.io/") {
    await this.page.goto(url);
    await this.myaccButton.hover();
    await this.loginLink.click();
  }

  async login(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
  
  async logout() {
    await this.myaccButton.hover();
    await this.logoutLink.click();
  }
}
