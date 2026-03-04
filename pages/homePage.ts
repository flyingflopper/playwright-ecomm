import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  private readonly categoryPaths = ["25", "33", "57", "17", "34", "18", "28", "30", "29", "32"];
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly navigationBarItems: Locator;
  readonly categoryNavButton: Locator;
  readonly categoryNavigationItems: Locator;
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
    this.categoryNavButton = page.getByRole("button", { name: "Shop by Category" });
    this.categoryNavigationItems = page.locator(".navbar-light > div > .navbar-nav > li > a[href*='category&path=']");
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

  async gotoRandomCategory() {
    await this.page.waitForLoadState("networkidle");
    const randomPath = this.categoryPaths[Math.floor(Math.random() * this.categoryPaths.length)];
    await this.page.goto(`https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=${randomPath}`);
    await this.page.locator("#mz-filter-panel-0-0").waitFor({ state: "visible" });
  }

  /* validate categories first, then implement random selection
  async gotoRandomCategory() {
    await this.page.waitForLoadState("networkidle");
    await this.categoryNavButton.click();
    await this.categoryNavigationItems.first().waitFor({ state: "visible" });
    await this.page.waitForTimeout(500);
    const count = await this.categoryNavigationItems.count();
    console.log(`Total categories: ${count}`);
    const randomIndex = Math.floor(Math.random() * count);
    await this.categoryNavigationItems.nth(randomIndex).click();
    await this.page.locator("#mz-filter-panel-0-0").waitFor({ state: "visible" });
  }
  */

  async gotoCategory(categoryName: string) {
    await this.page.waitForLoadState("networkidle");
    await this.categoryNavButton.click();
    await this.categoryNavigationItems.filter({ hasText: categoryName }).locator("a").click();
    await this.page.locator("#mz-filter-panel-0-0").waitFor({ state: "visible" });
  }
}
