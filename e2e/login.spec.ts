import { test, expect } from '@playwright/test';


test('Has page title', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    const navbar = page.getByTestId('home-navbar');
    const footer = page.getByTestId('home-footer');

    expect(navbar).not.toBeNull();
    expect(footer).not.toBeNull();
});