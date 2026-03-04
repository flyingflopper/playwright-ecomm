import { Page, Locator } from "@playwright/test";

export class ProductListingPage {
  readonly page: Page;
  readonly productList: Locator;
  readonly filters: Locator;
  readonly minPrice: Locator;
  readonly maxPrice: Locator;
  readonly manufacturerFilter: Locator;
  readonly subcategoryFilter: Locator;
  readonly searchFilter: Locator;
  readonly colorFilter: Locator;
  readonly availabilityFilter: Locator;
  readonly sizeFilter: Locator;
  readonly discountFilter: Locator;
  readonly ratingFilter: Locator;
  readonly sortByDropdown: Locator;
  readonly firstProduct: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productList = page.locator(".product-layout");
    this.filters = page.locator("#mz-filter-0");
    this.minPrice = page.locator("#mz-filter-panel-0-0").getByRole("spinbutton", { name: "Minimum Price" });
    this.maxPrice = page.locator("#mz-filter-panel-0-0").getByRole("spinbutton", { name: "Maximum Price" });
    this.manufacturerFilter = page.locator("#mz-filter-panel-0-1").getByText("Apple 42 Canon 10 Hewlett-");
    this.subcategoryFilter = page.getByText("Mice and Trackballs 10 Monitors 10 Printers 10 Scanners 10 Web Cameras");
    this.searchFilter = page.locator("#mz-filter-panel-0-3").getByRole("textbox", { name: "Search" });
    this.colorFilter = page.locator("#mz-filter-panel-0-4 > .mz-filter-group-content");
    this.availabilityFilter = page.getByText("In stock 8 Out Of Stock 0 2-3");
    this.sizeFilter = page.locator("#mz-filter-panel-0-6").getByText("L M S XL XXL");
    this.discountFilter = page.locator("#mz-filter-panel-0-7").getByText("10% off or more 0 20% off or");
    this.ratingFilter = page.locator("#mz-filter-panel-0-8").getByText("& up 0 & up 0 & up 0 & up");
    this.sortByDropdown = page.locator("#input-sort-212403");
    this.firstProduct = page.locator(".product-layout").first();
  }

  async applyPriceFilter(min: number, max: number) {
    await this.page.waitForLoadState("networkidle");
    await this.minPrice.clear();
    await this.minPrice.pressSequentially(min.toString(), { delay: 100 });
    await this.maxPrice.clear();
    await this.maxPrice.pressSequentially(max.toString(), { delay: 100 });
    await this.maxPrice.press("Tab");

    await this.page.waitForURL(/mz_fp=/);
    await this.page.waitForTimeout(4000);
  }

  async pricesAreWithinRange(min: number, max: number): Promise<boolean> {
    const prices = await this.productList.locator(".price-new").allTextContents();
    console.log("Raw prices:", prices); // see what's being captured

    return prices.every((priceText) => {
      const price = parseFloat(priceText.replace("$", "").replace(",", ""));
      return !isNaN(price) && price >= min && price <= max;
    });
  }

  async sortBy(
    option:
      | "Default"
      | "Best sellers"
      | "Popular"
      | "Newest"
      | "Name (A - Z)"
      | "Name (Z - A)"
      | "Price (Low > High)"
      | "Price (High > Low)"
      | "Rating (Highest)"
      | "Rating (Lowest)"
      | "Model (A - Z)"
      | "Model (Z - A)",
  ) {
    await this.sortByDropdown.selectOption({ label: option });
    await this.page.waitForURL(/sort=/);
  }

  async checkAscendingPrice(): Promise<boolean> {
    const prices = await this.productList.locator(".price-new").allTextContents();
    const numericPrices = prices.map((text) => parseFloat(text.replace("$", "").replace(",", ""))).filter((price) => !isNaN(price));
    for (let i = 1; i < numericPrices.length; i++) {
      if (numericPrices[i] < numericPrices[i - 1]) {
        return false;
      }
    }
    return true;
  }

  async checkDescendingPrice(): Promise<boolean> {
    const prices = await this.productList.locator(".price-new").allTextContents();
    const numericPrices = prices.map((text) => parseFloat(text.replace("$", "").replace(",", ""))).filter((price) => !isNaN(price));
    for (let i = 1; i < numericPrices.length; i++) {
      if (numericPrices[i] > numericPrices[i - 1]) {
        return false;
      }
    }
    return true;
  }

  async checkNameAZ(): Promise<boolean> {
    const prodNames = await this.productList.locator(".caption > h4 > a").allTextContents();
    const sortedNames = [...prodNames].sort((a, b) => a.localeCompare(b));
    return JSON.stringify(prodNames) === JSON.stringify(sortedNames);
  }

  async checkNameZA(): Promise<boolean> {
    const prodNames = await this.productList.locator(".caption > h4 > a").allTextContents();
    const sortedNames = [...prodNames].sort((a, b) => b.localeCompare(a));
    return JSON.stringify(prodNames) === JSON.stringify(sortedNames);
  }
}
