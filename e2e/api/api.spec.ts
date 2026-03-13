import { test } from "../../fixtures/fixturesBase";
import { expect } from "@playwright/test";

test.describe("Auth API", async () => {
  test("Verify Login API", async ({ page, request }) => {
    const response = await request.post("https://ecommerce-playground.lambdatest.io/index.php?route=account/login", {
      form: {
        email: process.env.AUTH_EMAIL!,
        password: process.env.AUTH_PASSWORD!,
      },
    });
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(response.url()).toContain("route=account/account");
  });
});

test.describe("PLP API tests", async () => {
  test.beforeEach(async ({ page, homePage }) => {
    await homePage.gotoRandomCategory();
  });

  const sortOptions = [
    { label: "Default", sort: "p.sort_order", order: "ASC" },
    { label: "Best sellers", sort: "order_quantity", order: "DESC" },
    { label: "Popular", sort: "p.viewed", order: "DESC" },
    { label: "Newest", sort: "p.date_added", order: "DESC" },
    { label: "Name (A - Z)", sort: "pd.name", order: "ASC" },
    { label: "Name (Z - A)", sort: "pd.name", order: "DESC" },
    { label: "Price (Low > High)", sort: "p.price", order: "ASC" },
    { label: "Price (High > Low)", sort: "p.price", order: "DESC" },
    { label: "Rating (Highest)", sort: "rating", order: "DESC" },
    { label: "Rating (Lowest)", sort: "rating", order: "ASC" },
    { label: "Model (A - Z)", sort: "p.model", order: "ASC" },
    { label: "Model (Z - A)", sort: "p.model", order: "DESC" },
  ] as const;

  for (const { label, sort, order } of sortOptions) {
    test(`Verify sort by ${label}`, async ({ page, productListingPage }) => {
      const [response] = await Promise.all([
        page.waitForResponse((res) => res.url().includes(`sort=${sort}`) && res.url().includes(`order=${order}`)),
        productListingPage.sortBy(label),
      ]);

      console.log(response.statusText());
      expect(response.status()).toBe(200);
      expect(page.url()).toContain(`sort=${sort}`);
      expect(page.url()).toContain(`order=${order}`);
    });
  }
});
