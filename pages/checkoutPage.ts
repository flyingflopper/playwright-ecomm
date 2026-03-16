import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly quantity: Locator;
  readonly newsletter: Locator;
  readonly privacy: Locator;
  readonly terms: Locator;
  readonly continueButton: Locator;
  readonly telephone: Locator;

  readonly checkoutOptions: {
    login: Locator;
    register: Locator;
    guest: Locator;
  };
  readonly personalDetails: {
    firstname: Locator;
    lastname: Locator;
    email: Locator;
    telephone: Locator;
    password: Locator;
    confirmPassword: Locator;
  };
  readonly billingDetails: {
    company: Locator;
    address1: Locator;
    address2: Locator;
    city: Locator;
    postcode: Locator;
    country: Locator;
    region: Locator;
    sameAsShipping: Locator;
  };

  readonly shippingDetails: {
    firstname: Locator;
    lastname: Locator;
    company: Locator;
    address1: Locator;
    address2: Locator;
    city: Locator;
    postcode: Locator;
    country: Locator;
    region: Locator;
  };

  readonly confirmButton: Locator;
  readonly confirmOrderTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutOptions = {
      login: page.locator("#input-account-login"),
      register: page.locator("#input-account-register"),
      guest: page.locator("#input-account-guest"),
    };
    this.quantity = page.locator("#checkout-cart input[type='number']");
    this.newsletter = page.locator("#input-newsletter");
    this.privacy = page.locator("#input-account-agree");
    this.terms = page.locator('label[for="input-agree"]');
    this.continueButton = page.locator("#button-save");
    this.telephone = page.locator("#input-telephone");

    this.personalDetails = {
      firstname: page.locator("#input-payment-firstname"),
      lastname: page.locator("#input-payment-lastname"),
      email: page.locator("#input-payment-email"),
      telephone: page.locator("#input-payment-telephone"),
      password: page.locator("#input-payment-password"),
      confirmPassword: page.locator("#input-payment-confirm"),
    };

    this.billingDetails = {
      company: page.locator("#input-payment-company"),
      address1: page.locator("#input-payment-address-1"),
      address2: page.locator("#input-payment-address-2"),
      city: page.locator("#input-payment-city"),
      postcode: page.locator("#input-payment-postcode"),
      country: page.locator("#input-payment-country"),
      region: page.locator("#input-payment-zone"),
      sameAsShipping: page.locator("#input-shipping-address-same"),
    };

    this.shippingDetails = {
      firstname: page.locator("#input-shipping-firstname"),
      lastname: page.locator("#input-shipping-lastname"),
      company: page.locator("#input-shipping-company"),
      address1: page.locator("#input-shipping-address-1"),
      address2: page.locator("#input-shipping-address-2"),
      city: page.locator("#input-shipping-city"),
      postcode: page.locator("#input-shipping-postcode"),
      country: page.locator("#input-shipping-country"),
      region: page.locator("#input-shipping-zone"),
    };

    this.confirmButton = page.locator("#button-confirm");
    this.confirmOrderTable = page.locator("#maza-checkout-confirm table");
  }

  async gotoCheckoutPage() {
    await this.page.goto(process.env.CHECKOUTPAGE_URL!);
  }

  // For guest/register checkout
  async fillPersonalDetails(firstname: string, lastname: string, email: string, telephone: string, password: string, confirmPassword: string) {
    await this.personalDetails.firstname.fill(firstname);
    await this.personalDetails.lastname.fill(lastname);
    await this.personalDetails.email.fill(email);
    await this.personalDetails.telephone.fill(telephone);
    await this.personalDetails.password.fill(password);
    await this.personalDetails.confirmPassword.fill(confirmPassword);
  }

  // For logged-in checkout
  async fillLoggedInDetails(firstname: string, lastname: string, telephone: string) {
    await this.telephone.fill(telephone);
    await this.personalDetails.firstname.fill(firstname);
    await this.personalDetails.lastname.fill(lastname);
  }

  async fillBillingDetails(address1: string, city: string, postcode: string, country: string, region: string) {
    await this.billingDetails.address1.fill(address1);
    await this.billingDetails.city.fill(city);
    await this.billingDetails.postcode.fill(postcode);
    await this.billingDetails.country.selectOption(country);
    await this.billingDetails.region.selectOption(region);
  }

  // For guest/register - privacy + terms
  async completeCheckout() {
    await this.privacy.check();
    await this.terms.check();
    await this.continueButton.click();
  }

  // For logged-in - only terms visible
  async completeLoggedInCheckout() {
    await this.terms.check();
    await this.continueButton.click();
  }

  async confirmOrder() {
    await this.confirmButton.click();
    await this.page.waitForURL(/route=checkout\/success/);
  }
}
