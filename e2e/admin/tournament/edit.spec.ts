import {expect, test} from "@playwright/test";
import {faker} from "@faker-js/faker";

const fakeAdminId = faker.string.alpha(12);
const fakeEmail = faker.internet.email();
const fakeName = faker.person.fullName();

const fakeTournamentId = faker.string.alpha(12);
const fakeTournamentName = faker.commerce.productName()
const fakeTournamentDescription = faker.lorem.paragraph();
const fakeContactPerson = faker.person.fullName();
const fakeContactNumber = faker.phone.number({style: 'international'});

const fakeCategory1Id = faker.string.alpha(12);
const fakeCategory2Id = faker.string.alpha(12);
const fakeCategory3Id = faker.string.alpha(12);

const fakeSportTypeId = faker.string.alpha(12);

test.beforeEach(async ({page}) => {
    await page.clock.setFixedTime(new Date('2024/11/23'));
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
                "id": fakeAdminId,
                "name": fakeName,
                "role": "organizer",
                "updated": "2024-11-16 19:31:18.154Z",
                "username": faker.internet.username(),
                "verified": false
            },
            "token": faker.internet.jwt()
        })
    }))
    await page.route('**/api/collections/tournaments/records/*?expand=*', route => route.fulfill({
        status: 200,
        body: JSON.stringify({
            "categories": [
                fakeCategory1Id,
                fakeCategory2Id
            ],
            "collectionId": "ctkwj5buy7z88a0",
            "collectionName": "tournaments",
            "contactNumber": fakeContactNumber,
            "contactPerson": fakeContactPerson,
            "created": "2024-11-23 12:14:38.597Z",
            "description": fakeTournamentDescription,
            "endDate": "2024-12-02 00:00:00.000Z",
            "expand": {
                "categories": [
                    {
                        "collectionId": fakeCategory1Id,
                        "collectionName": "tournamentCategories",
                        "created": "2024-11-23 12:14:39.656Z",
                        "id": "mymo5qppdy9qtib",
                        "isAgeRestriction": true,
                        "isIndividual": true,
                        "maxAge": 12,
                        "maxTeamMember": 0,
                        "minAge": 9,
                        "minTeamMember": 0,
                        "name": "Kategori 1",
                        "registrationFee": 100000,
                        "scoring": "g6y1w4jfdkbpbbn",
                        "tournament": "vat7nskf7lhzy5c",
                        "updated": "2024-11-26 14:39:15.553Z"
                    },
                    {
                        "collectionId": fakeCategory2Id,
                        "collectionName": "tournamentCategories",
                        "created": "2024-11-23 12:14:39.658Z",
                        "id": "s1tg7k2s689x55x",
                        "isAgeRestriction": false,
                        "isIndividual": false,
                        "maxAge": 0,
                        "maxTeamMember": 5,
                        "minAge": 0,
                        "minTeamMember": 3,
                        "name": "Kategori 2",
                        "registrationFee": 0,
                        "scoring": "g6y1w4jfdkbpbbn",
                        "tournament": "vat7nskf7lhzy5c",
                        "updated": "2024-11-23 12:14:39.658Z"
                    }
                ]
            },
            "id": fakeTournamentId,
            "isWaAvailable": true,
            "logo": "e3a1x_qf_ukrrjhh_ln_fn_fng_s9mjyWuJba.jpeg",
            "managedBy": fakeAdminId,
            "maxParticipation": 0,
            "name": fakeTournamentName,
            "pamflet": "e3a1x_qf_ukrrjhh_ln_fn_fng_LK0Kf2a92u.jpeg",
            "registrationEndDate": "2024-11-30 00:00:00.000Z",
            "registrationStartDate": "2024-11-01 00:00:00.000Z",
            "slug": "tournament-test-2",
            "sportType": fakeSportTypeId,
            "startDate": "2024-12-01 00:00:00.000Z",
            "status": "draft",
            "updated": "2024-11-26 14:43:42.983Z"
        })
    }))
    await page.route('**/api/collections/sportTypes/records?page=*&perPage=*', route => route.fulfill({
        status: 200,
        body: JSON.stringify({
            "page": 1,
            "perPage": 500,
            "totalItems": 1,
            "totalPages": 1,
            "items": [
                {
                    "collectionId": "kqvlc54o1qxns9x",
                    "collectionName": "sportTypes",
                    "created": "2024-11-19 15:37:54.847Z",
                    "description": "\u003cdiv\u003eKarate adalah seni bela diri yang berasal dari Jepang yang menggunakan tangan kosong untuk menyerang dan bertahan\u003c/div\u003e",
                    "id": fakeSportTypeId,
                    "isActive": true,
                    "name": "Karate",
                    "scoring": [
                        "7v5drwbm8jkz8c4",
                        "g6y1w4jfdkbpbbn"
                    ],
                    "updated": "2024-11-19 15:54:04.401Z"
                }
            ]
        })
    }))
    await page.route('**/api/collections/tournaments/records?page=*&perPage=*&filter=*', route => route.fulfill({
        status: 200,
        body: JSON.stringify({
            "page": 1,
            "perPage": 10,
            "totalItems": 1,
            "totalPages": 1,
            "items": [
                {
                    "categories": [
                        "mymo5qppdy9qtib",
                        "s1tg7k2s689x55x"
                    ],
                    "collectionId": "ctkwj5buy7z88a0",
                    "collectionName": "tournaments",
                    "contactNumber": "+62338818219",
                    "contactPerson": "Sukron",
                    "created": "2024-11-23 12:14:38.597Z",
                    "description": "\u003cdiv\u003easdasdasdasd asdasdasdassa\u003c/div\u003e",
                    "endDate": "2024-12-02 00:00:00.000Z",
                    "id": fakeTournamentId,
                    "isWaAvailable": true,
                    "logo": "e3a1x_qf_ukrrjhh_ln_fn_fng_s9mjyWuJba.jpeg",
                    "managedBy": "gps1jkhqve737zt",
                    "maxParticipation": 0,
                    "name": "Tournament  Test 2",
                    "pamflet": "e3a1x_qf_ukrrjhh_ln_fn_fng_LK0Kf2a92u.jpeg",
                    "registrationEndDate": "2024-11-30 00:00:00.000Z",
                    "registrationStartDate": "2024-11-01 00:00:00.000Z",
                    "slug": "tournament-test-2",
                    "sportType": "sy1mc8xwxiq54on",
                    "startDate": "2024-12-01 00:00:00.000Z",
                    "status": "draft",
                    "updated": "2024-11-26 14:43:42.983Z"
                }
            ]
        })
    }))
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name=email]', 'admintest1@gmail.com');
    await page.fill('input[name=password]', 'tesspass');
    await page.getByRole('button', {name: 'Masuk'}).click();
    await page.waitForTimeout(2000);
    await expect(page.getByRole('link', {name: 'Turnamen'})).toBeVisible();
    await page.getByRole('link', {name: 'Turnamen'}).click();
    await page.waitForTimeout(1000);
    await page.getByRole('row', { name: '1 Tournament Test 2 draft' }).getByRole('link').click();
    await page.waitForTimeout(1000);
})

test('Should prepopulate all tournament value', async ({page}) => {
    await expect(page.getByRole('textbox', { name: 'Nama' })).toHaveValue(fakeTournamentName);
    // await expect(page.locator('[id="editor-input-sport-description"]')).toHaveValue(`<div>${fakeTournamentDescription}</div>`);
    await page.getByRole('button', {name: 'Lanjut'}).click();
    await page.waitForTimeout(500);

    // test step 2


    // test step 3
})

test('Should update tournament', async ({page}) => {
    await page.getByRole('button', {name: 'Lanjut'}).click();
    await page.waitForTimeout(500);
    await page.getByRole('button', {name: 'Lanjut'}).click();
    await page.waitForTimeout(500);

})