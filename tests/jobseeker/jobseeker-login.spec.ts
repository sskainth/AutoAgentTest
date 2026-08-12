import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/jobseeker.fixture';

test.describe('Gaddr Jobs jobseeker login flow', () => {
  test.beforeEach(async ({ jobseekerProfile, loginPage }) => {
    await loginPage.goto(jobseekerProfile.jobseekerloginUrl);
  });

  test('jobseeker page shows login fields', async ({ loginPage }) => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test('jobseeker can log in and see welcome text', async ({ jobseekerProfile, loginPage }) => {
    await loginPage.fillEmail(jobseekerProfile.email);
    await loginPage.fillPassword(jobseekerProfile.password);
    await loginPage.signIn();
    await expect(loginPage.page.locator('text=/welcome/i')).toBeVisible();
  });
});
