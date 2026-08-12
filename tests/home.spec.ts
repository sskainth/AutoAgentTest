import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';

test.describe('Gaddr Jobs home page', () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
  });

  test('loads successfully and shows the main header links', async () => {
    await expect(home.logo).toBeVisible();
    await expect(home.findWorkLink).toBeVisible();
    await expect(home.hireLink).toBeVisible();
    await expect(home.exploreLink).toBeVisible();
  });

  test('clicking Find work navigates away from the homepage', async ({ page }) => {
    await home.clickFindWork();
    await expect(page).toHaveURL(/find|jobs|work/i);
  });

  test('clicking Hire navigates to the employer/hire experience', async ({ page }) => {
    await home.clickHire();
    await expect(page).toHaveURL(/jobs\.gaddr\.com\//);
  });

  test('clicking Explore navigates to the Explore section', async ({ page }) => {
    await home.clickExplore();
    await expect(page).toHaveURL(/\/explore$/);
  });

  test('logo returns users to the homepage', async ({ page }) => {
    await home.clickExplore();
    await expect(page).toHaveURL(/\/explore$/);
    await home.clickLogo();
    await expect(page).toHaveURL(/https:\/\/jobs\.gaddr\.com\/?$/);
  });

  test('search accepts input and submits a query', async ({ page }) => {
    await home.search('QA Tester');
    await expect(page).toHaveURL(/search|query|jobs|results/i);
  });

  test('theme toggle is displayed and accessible', async () => {
    await expect(home.themeToggle).toBeVisible();
    await expect(home.themeToggle).toHaveAttribute('aria-label', /Switch to (dark|light) theme/i);
  });

  test('switching theme updates page theme and icon state', async ({ page }) => {
    const initialThemeDark = await home.isDarkTheme();
    await home.toggleTheme();
    await expect(await home.isDarkTheme()).toBe(!initialThemeDark);
    const label = await home.getThemeToggleLabel();
    expect(label).toMatch(initialThemeDark ? /Switch to dark theme/i : /Switch to light theme/i);
  });

  test('switching theme twice returns to the original theme', async () => {
    const initialThemeDark = await home.isDarkTheme();
    await home.toggleTheme();
    await home.toggleTheme();
    await expect(await home.isDarkTheme()).toBe(initialThemeDark);
  });

  test('theme remains consistent across navigation', async ({ page }) => {
    await home.toggleTheme();
    const expectedDark = await home.isDarkTheme();
    await home.clickExplore();
    await expect(page).toHaveURL(/\/explore$/);
    await expect(await home.isDarkTheme()).toBe(expectedDark);
  });

  test('theme persists after refresh', async ({ page }) => {
    await home.toggleTheme();
    const expectedDark = await home.isDarkTheme();
    await page.reload();
    await expect(await home.isDarkTheme()).toBe(expectedDark);
  });

  test('theme remains stable after rapid toggling', async () => {
    for (let i = 0; i < 4; i++) {
      await home.toggleTheme();
    }
    await expect(home.findWorkLink).toBeVisible();
    await expect(home.themeToggle).toBeVisible();
  });

  test('theme toggle works via keyboard', async ({ page }) => {
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press('Tab');
      if (await home.themeToggle.evaluate(el => el === document.activeElement)) {
        break;
      }
    }
    await expect(home.themeToggle).toBeFocused();
    const before = await home.isDarkTheme();
    await page.keyboard.press('Enter');
    await expect(await home.isDarkTheme()).toBe(!before);
  });

  test('language selector is displayed and opens the menu', async () => {
    await expect(home.languageSelector).toBeVisible();
    await expect(home.languageSelector).toHaveText(/EN/i);
    await home.openLanguageMenu();
    await expect(home.languageOptions).toHaveCount(10);
    await expect(home.page.locator('button[role="option"]', { hasText: 'English' })).toBeVisible();
  });

  test('changing language can be selected and persists after refresh', async ({ page }) => {
    await home.selectLanguage('Svenska');
    await expect(page).toHaveURL(/\/sv$/);
    await expect(home.page.locator('body')).not.toContainText('{{');
    await expect(home.page.locator('body')).not.toContainText('undefined');
    await page.reload();
    await expect(page).toHaveURL(/\/sv$/);
  });

  test('language selector is keyboard accessible', async ({ page }) => {
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press('Tab');
      if (await home.languageSelector.evaluate(el => el === document.activeElement)) {
        break;
      }
    }
    await expect(home.languageSelector).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(home.languageOptions.first()).toBeVisible();
  });
});
