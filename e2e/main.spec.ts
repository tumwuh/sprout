import { test, expect } from '@playwright/test';


test('Has page title', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page).toHaveTitle('Tumwuh | Sport Tournament');
});