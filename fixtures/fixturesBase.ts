import { mergeTests } from "@playwright/test";
import { test as authTest } from "./authFixture";
import { test as homepageTest } from "./homepageFixture";
import { test as plpTest } from "./plpFixture";
import { test as blogTest } from "./blogFixture";
import { test as pdpTest } from "./pdpFixture";

export const test = mergeTests(homepageTest, authTest, plpTest, blogTest, pdpTest);

export { expect } from "@playwright/test";