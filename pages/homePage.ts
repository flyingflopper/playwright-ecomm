import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly navigationBarItems: Locator;
  readonly categoryNavigation: Locator;
  readonly trendingCategoriesSection: Locator;
  readonly topProductsSection: Locator;
  readonly topCollectionSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole("textbox", {
      name: "Search For Products",
    });
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.navigationBarItems = page.locator(".navbar-nav.horizontal > li > a");
    this.categoryNavigation = page.getByRole("navigation").filter({ hasText: "Components Cameras Phone," });
    this.trendingCategoriesSection = page.getByRole("heading", { name: "Top Trending Categories" });
    this.topProductsSection = page.getByText("Top Products Add to Cart Add");
    this.topCollectionSection = page.getByText("Top Collection Popular Latest");
  }

  async navigate(url: string = "https://ecommerce-playground.lambdatest.io/") {
    await this.page.goto(url);
  }

  async searchForProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  get searchResults() {
    return this.page.locator("#entry_212469 > .row");
  }

  get searchHeading() {
    return (term: string) => this.page.getByRole("heading", { name: `Search - ${term}` });
  }

  get navItemsCount() {
    return this.navigationBarItems.count();
  }
}
