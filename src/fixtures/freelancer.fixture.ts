import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { loginProfiles, type FreelancerLoginProfile } from '../data/login-profiles';

export type FreelancerFixtures = {
  freelancerProfile: FreelancerLoginProfile;
  loginPage: LoginPage;
};

export const test = base.extend<FreelancerFixtures>({
  freelancerProfile: async ({}, use) => {
    await use(loginProfiles.freelancer);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect };
