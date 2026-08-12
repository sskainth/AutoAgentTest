import { expect, Locator, Page } from '@playwright/test';
import { urls } from '../config/urls';

export class LoginPage {
  readonly page: Page;
  readonly signInPanel: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly showPasswordButton: Locator;
  readonly signInButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly googleSignInButton: Locator;
  readonly signUpLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInPanel = page.getByRole('tabpanel', { name: 'Sign In' });
    this.emailInput = this.signInPanel.getByRole('textbox', { name: 'Email', exact: true });
    this.passwordInput = this.signInPanel.getByRole('textbox', { name: 'Password', exact: true });
    this.showPasswordButton = this.signInPanel.getByRole('button', { name: 'Show password', exact: true });
    this.signInButton = this.signInPanel.getByRole('button', { name: /^Sign in$/ }).first();
    this.forgotPasswordLink = this.signInPanel.getByRole('link', { name: 'Forgot your password?', exact: true });
    this.googleSignInButton = this.signInPanel.getByRole('button', { name: 'Sign in with Google', exact: true });
    this.signUpLink = this.signInPanel.getByRole('link', { name: 'Sign up here', exact: true });

  }

  async goto(customUrl?: string) {
    const targetUrl = customUrl ?? urls.login;
    await this.page.goto(targetUrl);
    //await expect(this.page).toHaveURL(targetUrl);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
    await expect(this.emailInput).toHaveValue(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
    await expect(this.passwordInput).toHaveValue(password);
  }

  async toggleShowPassword() {
    await this.showPasswordButton.click();
  }

  async signIn() {
    await this.signInButton.click();
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.signIn();
  }
}
