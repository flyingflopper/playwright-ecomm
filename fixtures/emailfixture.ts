import { test as base } from '@playwright/test';

type TestFixtures = {
  userEmail: string;
};

export const test = base.extend<TestFixtures>({
  userEmail: async ({}, use) => {
    const email = `test+${Date.now()}@example.com`;
    await use(email);
  },
});