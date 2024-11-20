import {expect, test} from "@playwright/test";
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
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name=email]', 'admintest1@gmail.com');
    await page.fill('input[name=password]', 'tesspass');
    await page.getByRole('button', {name: 'Masuk'}).click();
    await page.waitForTimeout(2000);
    await expect(page.getByRole('link', {name: 'Jenis Olahraga'})).toBeVisible();
    await page.getByRole('link', {name: 'Jenis Olahraga'}).click();
    await page.waitForTimeout(1000);
    await page.getByRole('link', {name: 'Tambah Data'}).click();
    await page.waitForTimeout(1000);
})

test('All data form need to be rendered', async ({page}) => {
    await expect(page.getByRole('heading', {name: 'Formulir Jenis Olahraga'})).toBeVisible();
    expect(page.locator('#name')).not.toBeNull();
    expect(page.locator('#description')).not.toBeNull();
    await expect(page.getByLabel('Jenis Penilaian #1').getByPlaceholder('Nama')).toBeVisible();
    expect(page.locator('[id="scoringTypes\\.0\\.description"]')).not.toBeNull();
})

test('User can adjust scoring type', async ({page}) => {
    await page.getByRole('button', {name: '+ Menambahkan'}).click();
    await page.waitForTimeout(500);
    await expect(page.getByLabel('Jenis Penilaian #2').getByPlaceholder('Nama')).toBeVisible();
    await page.locator('#scoringTypes-0-remove-button').click();
    await page.waitForTimeout(1000);
    await expect(page.getByLabel('Jenis Penilaian #2').getByPlaceholder('Nama')).not.toBeVisible();
})

test('Validate all required value before submit', async ({page}) => {
    await page.getByText('Simpan').click();

    await expect(page.locator('#name__error')).toBeVisible();
    await expect(page.getByLabel('Jenis Penilaian #1').getByText('Nama wajib diisi.')).toBeVisible();

    await page.fill('#name', 'test');

    await page.getByText('Simpan').click();
    await expect(page.locator('#name__error')).not.toBeVisible();
    await expect(page.getByLabel('Jenis Penilaian #1').getByText('Nama wajib diisi.')).toBeVisible();

    await page.getByLabel('Jenis Penilaian #').getByPlaceholder('Nama').fill('test');
    await page.getByRole('button', {name: '+ Menambahkan'}).click();

    await page.getByText('Simpan').click();
    await expect(page.getByLabel('Jenis Penilaian #2').getByText('Nama wajib diisi.')).toBeVisible();

})

test('User can submit form with valid value', async ({page}) => {
    const sportTypeCalls: { [key: string]: any }[] = []
    const sportTypeUpdateCalls: { [key: string]: any }[] = []
    const scoringTypeCall: { [key: string]: any }[] = []
    const fakeSportTypeId = faker.string.alpha(12);
    const fakeScoringTypeId = faker.string.alpha(12);
    await page.route('**/api/collections/sportTypes/records', route => {
            const request = route.request();
            sportTypeCalls.push({
                url: request.url(),
                postData: request.postData(),
                headers: request.headers()
            });
            return route.fulfill({
                status: 200,
                body: JSON.stringify({
                    "id": fakeSportTypeId,
                    "collectionId": "kqvlc54o1qxns9x",
                    "collectionName": "sportTypes",
                    "created": "2022-01-01 01:00:00.123Z",
                    "updated": "2022-01-01 23:59:59.456Z",
                    "name": "test",
                    "description": "test",
                    "isActive": true,
                    "scoring": []
                })
            })
        }
    )
    await page.route('**/api/collections/sportTypes/records/*', route => {
            const request = route.request();
            sportTypeUpdateCalls.push({
                url: request.url(),
                postData: request.postData(),
                headers: request.headers()
            });
            return route.fulfill({
                status: 200,
                body: JSON.stringify({
                    "id": fakeSportTypeId,
                    "collectionId": "kqvlc54o1qxns9x",
                    "collectionName": "sportTypes",
                    "created": "2022-01-01 01:00:00.123Z",
                    "updated": "2022-01-01 23:59:59.456Z",
                    "name": "test",
                    "description": "test",
                    "isActive": true,
                    "scoring": []
                })
            })
        }
    )
    await page.route('**/api/collections/scoringTypes/records', route => {
            const request = route.request();
            scoringTypeCall.push({
                url: request.url(),
                postData: request.postData(),
                headers: request.headers()
            });
            return route.fulfill({
                status: 200,
                body: JSON.stringify({
                    "id": fakeScoringTypeId,
                    "collectionId": "kqvlc54o1qxns9x",
                    "collectionName": "sportTypes",
                    "created": "2022-01-01 01:00:00.123Z",
                    "updated": "2022-01-01 23:59:59.456Z",
                    "name": "test",
                    "description": "test",
                    "isActive": true,
                    "scoring": []
                })
            })
        }
    )
    await page.fill('#name', 'test');
    await page.fill('#description', 'test');
    await page.fill('[id="scoringTypes\\.0\\.name"]', 'test');
    await page.fill('[id="scoringTypes\\.0\\.description"]', 'test');
    await page.getByText('Simpan').click();
    await page.waitForTimeout(1000);
    await expect(page.getByText('Jenis olahraga berhasil dibuat!')).toBeVisible();
    expect(sportTypeCalls.length).toBe(1);
    expect(sportTypeUpdateCalls.length).toBe(1);
    expect(scoringTypeCall.length).toBe(1);

    expect(sportTypeCalls[0].postData).toStrictEqual(JSON.stringify({
        "name": "test",
        "description": "<div>test</div>",
        "isActive": true
    }))
    expect(sportTypeUpdateCalls[0].postData).toStrictEqual(JSON.stringify({"scoring": [fakeScoringTypeId]}))
    expect(scoringTypeCall[0].postData).toStrictEqual(JSON.stringify({
        "name": "test",
        "description": "<div>test</div>",
        "sportType": fakeSportTypeId,
        "isActive": true
    }))
    await page.waitForTimeout(1000);
    expect(page.url()).toBe('http://localhost:3000/admin/sport-type');
})