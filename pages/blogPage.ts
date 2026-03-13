import { Page, Locator } from "@playwright/test";

export class BlogPage {
  readonly page: Page;
  readonly articleTitle: Locator;
    constructor(page: Page) {
        this.page = page;
        this.articleTitle = page.locator('h1');
    }

    async getBlogTitle(): Promise<string> {
        const articleTitle = await this.articleTitle.textContent() ?? "";
        return articleTitle;
    }
}