import { APIRequestContext } from "@playwright/test";

export class ApiHelper {
  constructor(private request: APIRequestContext) {}

  async isLoggedIn(): Promise<boolean> {
    const response = await this.request.get("https://ecommerce-playground.lambdatest.io/index.php?route=account/account");
    const body = await response.text();
    return response.ok() && body.includes("My Account") && !body.includes("account-login");
  }

  async isLoggedOut(): Promise<boolean> {
    const response = await this.request.get("https://ecommerce-playground.lambdatest.io/index.php?route=account/logout");
    const body = await response.text();
    return response.ok() && body.includes("Account Logout");
  }
}
