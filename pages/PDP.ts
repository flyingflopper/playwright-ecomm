import { Page, Locator } from "@playwright/test";

export class ProductDetailPage {
  readonly page: Page;
  readonly addCartButton: Locator;
  readonly buyNowButton: Locator;
  readonly availability: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addCartButton = page.locator("button.button-cart[title='Add to Cart']").filter({visible: true }).first();
    this.buyNowButton = page.locator("button.button-buynow[title='Buy now']").first();
    this.availability = page.locator(".list-unstyled > li", { hasText: "Availability:" });
  }

  async getAvailability(): Promise<string> {
    const availibility = (await this.availability.locator(".badge").textContent()) ?? "";
    return availibility;
  }
}
