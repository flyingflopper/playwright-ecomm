import { mergeTests } from "@playwright/test";
import { test as homepageTest } from "./homepageFixture";
import { test as emailTest } from "./emailfixture";
import { test as plpTest } from "./plpFixture";

export const test = mergeTests(homepageTest, emailTest, plpTest);

export { expect } from "@playwright/test";