import {test, expect} from '@playwright/test';
import {faker} from "@faker-js/faker";


test('Has all component need to be', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    const navbar = page.getByTestId('home-navbar');
    const footer = page.getByTestId('home-footer');

    expect(page.getByPlaceholder('Email')).not.toBeNull();
    expect(page.getByPlaceholder('Kata sandi')).not.toBeNull();

    expect(navbar).not.toBeNull();
    expect(footer).not.toBeNull();
});

test('Validate all required form', async ({page}) => {
    await page.goto('http://localhost:3000/login');

    await page.getByRole('button', {name: 'Masuk'}).click();

    expect(page.getByText('Email anda wajib diisi.')).not.toBeNull();
    expect(page.getByText('Kata sandi anda wajib diisi.')).not.toBeNull();
})

test('Validate email format', async ({page}) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name=email]', 'test');
    await page.getByRole('button', {name: 'Masuk'}).click();

    expect(page.getByText('Email harus berupa alamat surel yang valid.')).not.toBeNull();
})


test('Login process success', async ({page}) => {

    await page.goto('http://localhost:3000/login');

    await page.fill('input[name=email]', 'teamtest1@gmail.com');
    await page.fill('input[name=password]', 'tesspass');


    await page.getByRole('button', {name: 'Masuk'}).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Login berhasil!')).toBeVisible();

    await page.waitForTimeout(2000);
    expect(page.url()).toBe('http://localhost:3000/');
    await expect(page.getByRole('button', { name: 'Profile picture' })).toBeVisible();

    await page.goto('http://localhost:3000/login');
    await page.waitForTimeout(2000);
    expect(page.url()).toBe('http://localhost:3000/');

})


test('Login process failed', async ({page}) => {
    await page.route('**/api/collections/users/auth-with-password', route => route.fulfill({
        status: 400,
        body: JSON.stringify({
            "code": 400,
            "message": "Failed to authenticate.",
            "data": {
                "identity": {
                    "code": "validation_required",
                    "message": "Missing required value."
                }
            }
        })
    }))

    await page.goto('http://localhost:3000/login');

    await page.fill('input[name=email]', 'test@example.com');
    await page.fill('input[name=password]', 'wrongpassword');
    await page.getByRole('button', {name: 'Masuk'}).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Login gagal!')).toBeVisible();
    await page.waitForTimeout(2000);
    expect(page.url()).toBe('http://localhost:3000/login');
});


test('Login process success as a organizer', async ({page}) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name=email]', 'organizer1@gmail.com');
    await page.fill('input[name=password]', 'tesspass');


    await page.getByRole('button', {name: 'Masuk'}).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Login berhasil!')).toBeVisible();

    await page.waitForTimeout(3000);
    expect(page.url()).toBe('http://localhost:3000/admin/dashboard');
    await expect(page.getByRole('link', { name: 'Turnamen' })).toBeVisible();
});