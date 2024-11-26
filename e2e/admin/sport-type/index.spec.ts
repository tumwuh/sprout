import {test, expect} from '@playwright/test';
import {faker} from "@faker-js/faker";

test.beforeEach(async ({page}) => {
    const fakeEmail = faker.internet.email();
    const fakeName = faker.person.fullName();
    await page.route('**/api/collections/users/auth-with-password', route => route.fulfill({
        status: 200,
        body: JSON.stringify({
            "record": {
                "avatar": "",
                "collectionId": "_pb_users_auth_",
                "collectionName": "users",
                "created": "2024-11-16 19:31:18.154Z",
                "email": fakeEmail,
                "emailVisibility": false,
                "id": faker.string.alpha(12),
                "name": fakeName,
                "role": "admin",
                "updated": "2024-11-16 19:31:18.154Z",
                "username": faker.internet.username(),
                "verified": false
            },
            "token": faker.internet.jwt()
        })
    }))
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name=email]', 'admintest1@gmail.com');
    await page.fill('input[name=password]', 'tesspass');
    await page.getByRole('button', {name: 'Masuk'}).click();
    await page.waitForTimeout(2000);
})


test('All data need to render', async ({page}) => {
    await page.route('**/sportTypes/records?page=*&perPage=*', route => route.fulfill({
        status: 200,
        body: JSON.stringify({
            "page": 1,
            "perPage": 30,
            "totalPages": 1,
            "totalItems": 2,
            "items": [
                {
                    "id": "RECORD_ID",
                    "collectionId": "kqvlc54o1qxns9x",
                    "collectionName": "sportTypes",
                    "created": "2022-01-01 01:00:00.123Z",
                    "updated": "2022-01-01 23:59:59.456Z",
                    "name": "test",
                    "description": "test",
                    "isActive": true,
                    "scoring": []
                },
                {
                    "id": "RECORD_ID",
                    "collectionId": "kqvlc54o1qxns9x",
                    "collectionName": "sportTypes",
                    "created": "2022-01-01 01:00:00.123Z",
                    "updated": "2022-01-01 23:59:59.456Z",
                    "name": "test2",
                    "description": "test2",
                    "isActive": true,
                    "scoring": []
                }
            ]
        })
    }))
    await expect(page.getByRole('link', { name: 'Cabang Olahraga' })).toBeVisible();
    await page.getByRole('link', { name: 'Cabang Olahraga' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByRole('heading', { name: 'Cabang Olahraga' })).toBeVisible();
    await page.waitForTimeout(500);
    await expect(page.getByRole('cell', { name: 'test', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'test2', exact: true })).toBeVisible();
})


test('Show description if data empty or null', async ({page}) => {
    await page.route('**/sportTypes/records?page=*&perPage=*', route => route.fulfill({
        status: 200,
        body: JSON.stringify({
            "page": 1,
            "perPage": 10,
            "totalPages": 1,
            "totalItems": 0,
            "items": []
        })
    }))

    await expect(page.getByRole('link', { name: 'Cabang Olahraga' })).toBeVisible();
    await page.getByRole('link', { name: 'Cabang Olahraga' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByRole('heading', { name: 'Cabang Olahraga' })).toBeVisible();
    await expect(page.getByText('Tidak ada data')).toBeVisible();
})