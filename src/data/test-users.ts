export interface TestUser {
  email: string;
  password: string;
}

export const testUsers: Record<'validUser', TestUser> = {
  validUser: {
    email: process.env.TEST_USER_EMAIL ?? 'ssekestmail@zohomail.eu',
    password: process.env.TEST_USER_PASSWORD ?? 'PlmOkn@1234',
  },
};

export const defaultLoginUser = testUsers.validUser;
