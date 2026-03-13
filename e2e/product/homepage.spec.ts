import { expect } from "@playwright/test";
import { test } from "../../fixtures/fixturesBase";

test.describe("Homepage tests", () => {
  test("Verify homepage elements", async ({ homePage }) => {
    await expect(homePage.searchInput).toBeVisible();
    await expect(homePage.searchButton).toBeVisible();
    await expect(homePage.navigationBarItems).toHaveCount(6);
    await expect(homePage.trendingCategoriesSection).toBeVisible();
    await expect(homePage.topProductsSection).toBeVisible();
    await expect(homePage.topCollectionSection).toBeVisible();
  });

  test("Search for a product", async ({ homePage }) => {
    await homePage.searchForProduct("phone");
    await expect(homePage.searchHeading("phone")).toBeVisible();
    await expect(homePage.searchResults).toBeVisible();
  });

  test("Verify navigation bar items", async ({ homePage }) => {
    await expect(homePage.navigationBarItems).toHaveCount(6);
    await expect(homePage.navigationBarItems.nth(0)).toContainText("Home");
    await expect(homePage.navigationBarItems.nth(1)).toContainText("Special");
    await expect(homePage.navigationBarItems.nth(2)).toContainText("Blog");
    await expect(homePage.navigationBarItems.nth(3)).toContainText("Mega Menu");
    await expect(homePage.navigationBarItems.nth(4)).toContainText("AddOns");
    await expect(homePage.navigationBarItems.nth(5)).toContainText("My account");
  });

  test("Blogs should redirect to their article", async ({ homePage, blogPage }) => {
    const {title, locator} = await homePage.getrandomArticle();
    await locator.click();

    const redirectedTitle = await blogPage.getBlogTitle();
    expect(title).toBe(redirectedTitle);
  });
});
