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
    await this.minPrice.fill(min.toString());
    await this.maxPrice.fill(max.toString());
  }
}
