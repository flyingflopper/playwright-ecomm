import { test as base } from "@playwright/test";
import { BlogPage } from "../pages/blogPage";

type myFixtures = {
    blogPage: BlogPage;
};

export const test = base.extend<myFixtures>({
    blogPage: async ({ page }, use) => {
        const blogPage = new BlogPage(page);
        await use(blogPage);
    }
});