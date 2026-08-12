import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/recruiter.fixture';

test.describe('Gaddr Jobs recruiter login flow', () => {
  test.beforeEach(async ({ recruiterProfile, loginPage }) => {
    await loginPage.goto(recruiterProfile.recruiterloginUrl);
  });

  test('recruiter page shows login fields', async ({ loginPage }) => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test('recruiter can log in and see Recruiter Dashboard', async ({ recruiterProfile, loginPage, page }) => {
    await loginPage.fillEmail(recruiterProfile.email);
    await loginPage.fillPassword(recruiterProfile.password);
    await loginPage.signIn();
    await page.waitForLoadState('networkidle');
    await expect(loginPage.page.locator('text=/Recruiter Dashboard/i')).toBeVisible();
  });
});
