import {test, expect} from '@playwright/test';
import {sleep} from "@antfu/utils";


test('Has all component need to be', async ({page}) => {
    await page.goto('http://localhost:3000/organizer-registration');
    const navbar = page.getByTestId('home-navbar');
    const footer = page.getByTestId('home-footer');

    expect(page.getByPlaceholder('Email')).not.toBeNull();
    expect(page.getByPlaceholder('Kata sandi')).not.toBeNull();

    expect(navbar).not.toBeNull();
    expect(footer).not.toBeNull();
});

test('Validate all required form', async ({page}) => {
    await page.goto('http://localhost:3000/organizer-registration');

    await sleep(1000);
    await page.getByRole('button', {name: 'Daftar'}).click();

    expect(page.getByText('Nama organizer wajib diisi.')).not.toBeNull();
    expect(page.getByText('Email wajib diisi.')).not.toBeNull();
    expect(page.getByText('Kata sandi wajib diisi.')).not.toBeNull();
    expect(page.getByText('Ulangi kata sandi wajib diisi.')).not.toBeNull();
})


test('Registration process success', async ({page}) => {
    await page.route('**/users/records', route => route.fulfill({
        status: 200,
        body: JSON.stringify({
            "avatar": "",
            "collectionId": "_pb_users_auth_",
            "collectionName": "users",
            "created": "2024-11-12 15:42:58.310Z",
            "emailVisibility": false,
            "id": "3dj3nrzxv31y4fk",
            "name": "Test data",
            "role": "organizer",
            "updated": "2024-11-12 15:42:58.310Z",
            "username": "users71577",
            "verified": false
        })
    }))

    await page.goto('http://localhost:3000/organizer-registration');

    await page.fill('input[name=name]', 'Test data');
    await page.fill('input[name=email]', 'test@example.com');
    await page.fill('input[name=password]', 'tesspass');
    await page.fill('input[name=passwordConfirm]', 'tesspass');


    await page.getByRole('button', {name: 'Daftar'}).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Pendaftaran anda berhasil!')).toBeVisible();
    await page.waitForTimeout(3000);
    expect(page.url()).toBe('http://localhost:3000/login');
})

test('Registration process failed', async ({page}) => {
    await page.route('**/users/records', route => route.fulfill({
        status: 200,
        body: JSON.stringify({
            "code": 400,
            "error": "Email sudah terdaftar"
        })
    }))

    await page.goto('http://localhost:3000/organizer-registration');

    await page.fill('input[name=name]', 'Test data');
    await page.fill('input[name=email]', 'test@example.com');
    await page.fill('input[name=password]', 'tesspass');
    await page.fill('input[name=passwordConfirm]', 'tesspass');

    await page.getByRole('button', {name: 'Daftar'}).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Pendaftaran anda gagal!')).toBeVisible();
    await page.waitForTimeout(1000);
    expect(page.url()).toBe('http://localhost:3000/organizer-registration');
});