import { Page, Locator } from "@playwright/test";

export class ProductDetailPage {
  readonly page: Page;
  readonly addCartButton: Locator;
  readonly availability: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addCartButton = page.getByRole("button", {name: "Add to Cart"});
    this.availability = page.locator(".list-unstyled > li", {hasText: "Availability:"});
  }

  async getAvailability(): Promise <string> {
    const availibility = await this.availability.locator(".badge").textContent() ?? "";
    return availibility;
  }
}
