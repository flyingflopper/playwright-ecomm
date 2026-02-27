import { mergeTests } from "@playwright/test";
import { test as authTest } from "./authFixture";
import { test as homepageTest } from "./homepageFixture";
import { test as plpTest } from "./plpFixture";

export const test = mergeTests(homepageTest, authTest, plpTest);

export { expect } from "@playwright/test";