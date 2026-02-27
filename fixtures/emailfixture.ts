import { test as base } from '@playwright/test';

type myFixtures = {
  userEmail: string;
};

export const test = base.extend<myFixtures>({
  userEmail: async ({}, use) => {
    const email = `test+${Date.now()}@example.com`;
    await use(email);
  },
});