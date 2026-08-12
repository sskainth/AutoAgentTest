import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { loginProfiles, type JobseekerLoginProfile } from '../data/login-profiles';

export type JobseekerFixtures = {
  jobseekerProfile: JobseekerLoginProfile;
  loginPage: LoginPage;
};

export const test = base.extend<JobseekerFixtures>({
  jobseekerProfile: async ({}, use) =>
    await use(loginProfiles.jobseeker as JobseekerLoginProfile),

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect };
