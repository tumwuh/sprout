import {expect, test} from "@playwright/test";
import {faker} from "@faker-js/faker";

const fakeSportTypeId = faker.string.alpha(12);
const fakeScoringTypeId1 = faker.string.alpha(12);
const fakeScoringTypeId2 = faker.string.alpha(12);
const fakeScoringTypeId3 = faker.string.alpha(12);
const fakeDescription1 = faker.lorem.paragraph();
const fakeDescription2 = faker.lorem.paragraph();
const fakeDescription3 = faker.lorem.paragraph();
const fakeName1 = faker.commerce.productName();
const fakeName2 = faker.commerce.productName();
const fakeName3 = faker.commerce.productName();

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
            "items": [
                {
                    "id": fakeSportTypeId,
                    "collectionId": "kqvlc54o1qxns9x",
                    "collectionName": "sportTypes",
                    "created": "2022-01-01 01:00:00.123Z",
                    "updated": "2022-01-01 23:59:59.456Z",
                    "name": "test",
                    "description": "test",
                    "isActive": true,
                    "scoring": []
                },
            ]
        })
    }))
    await page.route('**/api/collections/sportTypes/records/*?expand=*', route => route.fulfill({
        status: 200,
        body: JSON.stringify({
            "collectionId": "kqvlc54o1qxns9x",
            "collectionName": "sportTypes",
            "created": "2024-11-19 15:37:54.847Z",
            "description": fakeDescription1,
            "expand": {
                "scoring": [
                    {
                        "collectionId": "attdlnbe5lpyyjd",
                        "collectionName": "scoringTypes",
                        "created": "2024-11-19 15:37:55.748Z",
                        "description": fakeDescription2,
                        "id": fakeScoringTypeId1,
                        "isActive": true,
                        "name": fakeName3,
                        "sportType": fakeSportTypeId,
                        "updated": "2024-11-19 15:37:55.748Z"
                    },
                    {
                        "collectionId": "attdlnbe5lpyyjd",
                        "collectionName": "scoringTypes",
                        "created": "2024-11-19 15:37:55.740Z",
                        "description": fakeDescription3,
                        "id": fakeScoringTypeId2,
                        "isActive": true,
                        "name": fakeName2,
                        "sportType": "sy1mc8xwxiq54on",
                        "updated": "2024-11-19 15:37:55.740Z"
                    }
                ]
            },
            "id": fakeSportTypeId,
            "isActive": true,
            "name": fakeName1,
            "updated": "2024-11-19 15:37:56.573Z"
        })
    }))

    await page.goto('http://localhost:3000/login');
    await page.fill('input[name=email]', 'admintest1@gmail.com');
    await page.fill('input[name=password]', 'tesspass');
    await page.getByRole('button', {name: 'Masuk'}).click();
    await page.waitForTimeout(2000);
    await expect(page.getByRole('link', {name: 'Cabang Olahraga'})).toBeVisible();
    await page.getByRole('link', {name: 'Cabang Olahraga'}).click();
    await page.waitForTimeout(1000);
    await page.getByRole('row', {name: '1 test Aktif Nonaktifkan'}).getByRole('link').click();
    await page.waitForTimeout(1000);
})

test('Need to populate form with existing data', async ({page}) => {
    expect(page.url()).toBe(`http://localhost:3000/admin/sport-type/${fakeSportTypeId}/edit`);
    await expect(page.locator('#sport-name')).toHaveValue(fakeName1);
    await expect(page.locator('#editor-input-sport-description')).toHaveValue(`<div>${fakeDescription1}</div>`);
    await expect(page.getByLabel('Jenis Penilaian #1').getByPlaceholder('Nama')).toHaveValue(fakeName3);
    await expect(page.locator('#editor-input-scoring-description-0')).toHaveValue(`<div>${fakeDescription2}</div>`);
    await expect(page.getByLabel('Jenis Penilaian #2').getByPlaceholder('Nama')).toHaveValue(fakeName2);
    await expect(page.locator('#editor-input-scoring-description-1')).toHaveValue(`<div>${fakeDescription3}</div>`);
})


test('Sending right param according user input', async ({page}) => {

    const sportTypeUpdateCalls: { [key: string]: any }[] = [];
    const scoringTypeCall: { [key: string]: any }[] = [];

    await page.route('**/api/collections/sportTypes/records/*', route => {
            const request = route.request();
            sportTypeUpdateCalls.push({
                url: request.url(),
                postData: request.postData(),
                method: request.method(),
                params: request.url().split('/').pop()
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
                method: request.method()
            });
            return route.fulfill({
                status: 200,
                body: JSON.stringify({
                    "id": fakeScoringTypeId3,
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

    await page.route('**/api/collections/scoringTypes/records/*', route => {
            const request = route.request();
            scoringTypeCall.push({
                url: request.url(),
                postData: request.postData(),
                method: request.method(),
                params: request.url().split('/').pop()
            });
            return route.fulfill({
                status: 200,
                body: JSON.stringify({
                    "id": fakeScoringTypeId1,
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

    expect(page.url()).toBe(`http://localhost:3000/admin/sport-type/${fakeSportTypeId}/edit`);
    await page.locator('#scoringTypes-1-remove-button').click();
    await page.waitForTimeout(500);
    await page.getByRole('button', {name: '+ Menambahkan'}).click();
    await page.waitForTimeout(500);
    const newFakename = faker.commerce.productName();
    const newFakeDescription = faker.lorem.paragraph();
    await page.getByLabel('Jenis Penilaian #2').getByPlaceholder('Nama').fill(newFakename);
    await page.locator('#scoring-description-1').fill(newFakeDescription);
    await page.waitForTimeout(500);
    await page.getByText('Simpan').click();
    await page.waitForTimeout(1000);
    await expect(page.getByText('Cabang olahraga berhasil diubah!')).toBeVisible();
    expect(scoringTypeCall.length).toBe(3)
    expect(scoringTypeCall[0].method).toBe('DELETE')
    expect(scoringTypeCall[0].params).toBe(fakeScoringTypeId2)

    expect(scoringTypeCall[1].method).toBe('PATCH')
    expect(scoringTypeCall[1].params).toBe(fakeScoringTypeId1)

    const scoringTypeCall2 = JSON.parse(scoringTypeCall[2].postData);
    expect(scoringTypeCall[2].method).toBe('POST')
    expect(scoringTypeCall2.name).toBe(newFakename)
    expect(scoringTypeCall2.description).toBe(`<div>${newFakeDescription}</div>`)

    const sportTypeUpdateCall = JSON.parse(sportTypeUpdateCalls[0].postData);
    expect(sportTypeUpdateCalls.length).toBe(1);
    expect(sportTypeUpdateCalls[0].params).toBe(fakeSportTypeId)
    expect(sportTypeUpdateCalls[0].method).toBe('PATCH')
    expect(sportTypeUpdateCall.scoring).toStrictEqual([fakeScoringTypeId1, fakeScoringTypeId3])



})