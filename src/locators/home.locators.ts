export const homeLocators = {
  logo: 'banner a[href="/"]',
  findWork: 'button:has-text("Find work")',
  hire: 'button:has-text("Hire")',
  explore: 'a[href="/explore"]:has-text("Explore")',
  searchInput: 'input[aria-label="Search roles, skills and companies"]',
  searchButton: 'button:has-text("Search")',
  themeToggle: 'button[aria-label^="Switch to "][aria-label*="theme"]',
  languageSelector: 'button[aria-label="Change language"]',
  languageOptions: 'button[role="option"]',
  languageOptionText: (language: string) => `button[role="option"]:has-text("${language}")`,
  jobCards: '[data-testid="job-card"], .job-card, article.job',
};
