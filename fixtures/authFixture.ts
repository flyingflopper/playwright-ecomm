import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { RegisterPage } from '../pages/registerPage';

type myFixtures = {
  userEmail: string;
  loginPage: LoginPage;
  registerPage: RegisterPage;
};

export const test = base.extend<myFixtures>({
  userEmail: async ({}, use) => {
    const email = `test+${Date.now()}@example.com`;
    await use(email);
  },

  loginPage: async ({page}, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  registerPage: async ({page}, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  }
});