import { test, expect } from '@playwright/test';


test.beforeAll("Before All", async() => {
  console.log("Before All");
});


test.beforeAll("Before Each", async() => {
  console.log("Before Each");
});

test.beforeAll("After Each", async() => {
  console.log("Before Each");
});

test.beforeAll("After All", async() => {
  console.log("After All");
});



test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
