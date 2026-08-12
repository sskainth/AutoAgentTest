import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/freelancer.fixture';

test.describe('Gaddr Jobs freelancer login flow', () => {
  test.beforeEach(async ({ freelancerProfile, loginPage }) => {
    await loginPage.goto(freelancerProfile.freelancerloginUrl);
  });

  test('freelancer page shows login fields', async ({ loginPage }) => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test('freelancer can log in and see welcome text', async ({ freelancerProfile, loginPage }) => {
    await loginPage.fillEmail(freelancerProfile.email);
    await loginPage.fillPassword(freelancerProfile.password);
    await loginPage.signIn();
    await expect(loginPage.page.locator('text=/welcome/i')).toBeVisible();
  });
});
