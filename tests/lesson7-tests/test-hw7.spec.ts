import { test, expect } from '@playwright/test';

test.beforeAll(() => {
  console.log(`Running test suite for HW#7`);
});

test.describe('TS-7', () => {
  const baseUrl = 'https://telemart.ua/ua/';

  const mainWrapperElementsSelector: string =
    '//div[contains(@class, "swiper-on-main")]/div[@class="swiper-wrapper"]/a'; // roundabout wrapper
  const swiperButtonNext: string = '//div[@class = "swiper-button-next"]';
  const swiperActiveElementSelector: string =
    '//div[@class="swiper-wrapper"]/a[contains(@class,"swiper-slide-active")]';

  test('TC-1 Roundabout has more than 2 elements', async ({ page }) => {
    await page.goto(baseUrl);

    // select all elements in the roundabout wrapper
    const mainWrapperElements = await page
      .locator(mainWrapperElementsSelector)
      .all();

    // expect number of elements in the roundabout wrapper > 2
    expect(mainWrapperElements.length).toBeGreaterThan(2);
    console.log(
      'TC-1. Number of the roundabout elements = ',
      mainWrapperElements.length,
    );
  });

  test('TC-2 Scrolling roundabout elements', async ({ page }) => {
    await page.goto(baseUrl);

    // define active element of the roundabout wrapper and its data-banner-id
    let swiperActiveElement = page.locator(swiperActiveElementSelector);
    // await swiperActiveElement.click();
    const bannerId1 = await swiperActiveElement.getAttribute('data-banner-id');
    console.log("TC-2. Banner IDs of the roundabout's active elements:");
    console.log('bannerId1: ', bannerId1);

    // scroll the roundabout
    await page.locator(swiperButtonNext).click();
    await page.locator(swiperButtonNext).click();

    // define new active element of the roundabout wrapper and its data-banner-id
    swiperActiveElement = page.locator(swiperActiveElementSelector);
    const bannerId2 = await swiperActiveElement.getAttribute('data-banner-id');
    console.log('bannerId2: ', bannerId2);

    expect(bannerId1).not.toEqual(bannerId2);
  });
});
