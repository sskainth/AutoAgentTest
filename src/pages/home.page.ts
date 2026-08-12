import { expect, Locator, Page } from '@playwright/test';
import { urls } from '../config/urls';
import { homeLocators } from '../locators/home.locators';

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly findWorkLink: Locator;
  readonly hireLink: Locator;
  readonly exploreLink: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly themeToggle: Locator;
  readonly languageSelector: Locator;
  readonly languageOptions: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('header a[href="/"]');
    this.findWorkLink = page.getByRole('button', { name: 'Find work' });
    this.hireLink = page.getByRole('button', { name: 'Hire' });
    this.exploreLink = page.getByRole('link', { name: /^Explore$/, exact: true });
    this.searchInput = page.getByRole('searchbox', { name: 'Search roles, skills and companies' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.themeToggle = page.getByRole('button', { name: /Switch to (dark|light) theme/i });
    this.languageSelector = page.getByRole('button', { name: 'Change language' });
    this.languageOptions = page.getByRole('option');
  }

  async goto() {
    await this.page.goto(urls.home);
    await expect(this.page).toHaveURL(/jobs\.gaddr\.com/);
  }

  async clickLogo() {
    await this.page.evaluate(() => {
      const logo = document.querySelector('header a[href="/"]');
      if (logo) {
        (logo as HTMLElement).click();
      }
    });
  }

  async clickFindWork() {
    await this.findWorkLink.click();
  }

  async clickHire() {
    await this.hireLink.click();
  }

  async clickExplore() {
    await this.exploreLink.click();
  }

  async search(text: string) {
    await this.searchInput.fill(text);
    await expect(this.searchInput).toHaveValue(text);
    await this.searchButton.click();
  }

  async toggleTheme() {
    await this.themeToggle.click();
  }

  async isDarkTheme() {
    return this.page.evaluate(() => document.documentElement.classList.contains('dark'));
  }

  async getThemeToggleLabel() {
    return this.themeToggle.getAttribute('aria-label');
  }

  async openLanguageMenu() {
    await this.languageSelector.click();
    await expect(this.languageOptions).toHaveCount(10);
    await expect(this.languageOptions.first()).toBeVisible();
  }

  async selectLanguage(language: string) {
    await this.openLanguageMenu();
    await this.page.getByRole('option', { name: language, exact: true }).click();
    await expect(this.languageSelector).toHaveAttribute('aria-expanded', 'false');
  }

  async getSelectedLanguage() {
    return (await this.languageSelector.textContent())?.trim() ?? '';
  }
}
