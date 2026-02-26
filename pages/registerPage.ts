import { Page, Locator } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;
  readonly myaccButton: Locator;
  readonly registerLink: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly telephoneInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordConfirmInput: Locator;
  readonly subscribeYes: Locator;
  readonly subscribeNo: Locator;
  readonly agreeCheckbox: Locator;
  readonly continueButton: Locator;
  readonly invalidEmailErrorMsg: Locator;
  readonly subscribeErrorMsg: Locator;
  readonly registerSuccessMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myaccButton = page.getByRole("button", { name: "My Account" });
    this.registerLink = page.getByRole("link", { name: "Register" });
    this.firstNameInput = page.getByRole("textbox", { name: "First Name*" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last Name*" });
    this.emailInput = page.getByRole("textbox", { name: "E-Mail*" });
    this.telephoneInput = page.getByRole("textbox", { name: "Telephone*" });
    this.passwordInput = page.getByRole("textbox", { name: "Password*" });
    this.passwordConfirmInput = page.getByRole("textbox", {
      name: "Password Confirm*",
    });
    this.subscribeYes = page.getByText("Yes");
    this.subscribeNo = page.getByText("No");
    this.agreeCheckbox = page.getByText("I have read and agree to the");
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.invalidEmailErrorMsg = page.getByText(
      "E-Mail Address does not appear to be valid!",
    );
    this.subscribeErrorMsg = page.getByText(
      "Warning: You must agree to the Privacy Policy!",
    );
    this.registerSuccessMsg = page.getByText("Your Account Has Been Created!");
  }

  async navigate(url: string = "https://ecommerce-playground.lambdatest.io/") {
    await this.page.goto(url);
    await this.myaccButton.hover();
    await this.registerLink.waitFor({ state: 'visible' });
    await this.registerLink.click();
  }

  async register(
    firstname: string,
    lastname: string,
    email: string,
    telephone: string,
    password: string,
    subscribe: boolean,
    agree: boolean,
  ) {
    await this.registerLink.click();
    await this.firstNameInput.fill(firstname);
    await this.lastNameInput.fill(lastname);
    await this.emailInput.fill(email);
    await this.telephoneInput.fill(telephone);
    await this.passwordInput.fill(password);
    await this.passwordConfirmInput.fill(password);
    if (subscribe) {
      await this.subscribeYes.click();
    } else {
      await this.subscribeNo.click();
    }
    if (agree) {
      await this.agreeCheckbox.click();
    }
    await this.continueButton.click();
  }
}
