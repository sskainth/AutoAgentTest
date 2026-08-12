import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { loginProfiles, type RecruiterLoginProfile } from '../data/login-profiles';

export type RecruiterFixtures = {
  recruiterProfile: RecruiterLoginProfile;
  loginPage: LoginPage;
};

export const test = base.extend<RecruiterFixtures>({
  recruiterProfile: async ({}, use) => {
    await use(loginProfiles.recruiter as RecruiterLoginProfile);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect };
