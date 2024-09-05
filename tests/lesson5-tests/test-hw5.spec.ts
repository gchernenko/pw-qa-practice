import { test, expect } from '@playwright/test';
import {
  articleTitle,
  articleThesis,
  articleBody,
  articleTags,
} from './testArticle.ts';
import { stringify } from 'querystring';

//////////////////////////////////////////////// TestSuite /////////////////////////////////////////////////
test.describe('demo.learnwebdriverio.com resource', () => {
  const suiteName = 'demo.learnwebdriverio.com';

  test.beforeAll(() => {
    console.log('Running demo.learnwebdriverio.com testsuite');
  });

  test('TS-1 login & create article', async ({ page }) => {
    //////////////////////////////// TC Sign In ////////////////////////////////////////
    const baseUrl: string = 'https://demo.learnwebdriverio.com/';
    const userEmail: string = 'gala.tst5@gmail.com';
    const userPassword: string = '12345';

    const signInLink: string =
      '//a[@class="nav-link" and contains(text(), "Sign in")]';
    const signInTitle: string = '//h1[contains(text(), "Sign in")]';
    const inputEmail: string = '//input[@type="email"]';
    const inputPassword: string = '//input[@type="password"]';
    const signInButton: string = '//button[contains(text(), "Sign in")]';
    const newArticleLink: string = '//a[contains(text(), "New Article")]';

    //////////////////// Sign In ////////////////////
    await page.goto(baseUrl);
    await page.locator(signInLink).click();
    await expect(page.locator(signInTitle)).toBeVisible();
    // await page.locator(inputEmail).click();
    await page.locator(inputEmail).fill(userEmail);
    // await page.locator(inputPassword).click();
    await page.locator(inputPassword).fill(userPassword);
    await page.locator(signInButton).click();
    await expect(page.locator(newArticleLink)).toBeVisible();

    //////////////////// Add New Article ////////////////////
    const buttonPublishArticle: string =
      '//button[contains(text(), "Publish Article")]';
    const inputTitleButton: string = '//input[@data-qa-id="editor-title"]';
    const inputThesis: string = '//input[@data-qa-id="editor-description"]';
    const textareaArticleBody: string =
      '//textarea[contains(@class, "auto-textarea-input")]';
    const inputTags: string = '//input[@data-qa-id="editor-tags"]';
    const h1ArticleTitle: string = '//h1[@data-qa-id="article-title"]';

    await page.locator(newArticleLink).click();
    await expect(page.locator(buttonPublishArticle)).toBeVisible();

    // await page.locator(inputTitleButton).click();
    await page.locator(inputTitleButton).fill(articleTitle); // Fill Title

    // await page.locator(inputThesis).click();
    await page.locator(inputThesis).fill(articleThesis); // Fill Thesis

    // await page.locator(textareaArticleBody).click();
    await page.locator(textareaArticleBody).fill(articleBody); // Fill Body

    // await page.locator(inputTags).click();
    await page.locator(inputTags).fill(articleTags); // Fill Tags

    await page.locator(buttonPublishArticle).click(); // Publish Article
    await expect(page.locator(h1ArticleTitle)).toContainText(articleTitle);
  });
});
