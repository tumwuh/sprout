import {expect, test} from "@playwright/test";
import {faker} from "@faker-js/faker";


const fakeAdminId = faker.string.alpha(12);
const fakeEmail = faker.internet.email();
const fakeName = faker.person.fullName();

const fakeTournamentDescription = faker.lorem.paragraph();

const fakeSportTypeId = faker.string.alpha(12);

const kataScoringId = faker.string.alpha(12);
const kumiteScoringId = faker.string.alpha(12);
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
                    "description": "<div>Test sporttype</div>",
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
    await page.route('**/tournaments/records?page=*&perPage=*', route => route.fulfill({
        status: 200,
        body: JSON.stringify({
            "page": 1,
            "perPage": 10,
            "totalPages": 1,
            "totalItems": 0,
            "items": []
        })
    }))

    await page.route('**/api/collections/scoringTypes/records?page=*&perPage=*&skipTotal=*&filter=*', route => route.fulfill({
        status: 200,
        body: JSON.stringify({
            "page": 1,
            "perPage": 500,
            "totalItems": -1,
            "totalPages": -1,
            "items": [
                {
                    "collectionId": "attdlnbe5lpyyjd",
                    "collectionName": "scoringTypes",
                    "created": "2024-11-19 15:37:55.740Z",
                    "description": "",
                    "id": kataScoringId,
                    "isActive": true,
                    "name": "Kata",
                    "sportType": "sy1mc8xwxiq54on",
                    "updated": "2024-11-19 15:54:04.307Z"
                },
                {
                    "collectionId": "attdlnbe5lpyyjd",
                    "collectionName": "scoringTypes",
                    "created": "2024-11-19 15:37:55.748Z",
                    "description": "",
                    "id": kumiteScoringId,
                    "isActive": true,
                    "name": "Kumite",
                    "sportType": "sy1mc8xwxiq54on",
                    "updated": "2024-11-19 15:54:04.314Z"
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
    await page.getByRole('link', {name: 'Tambah Data'}).click();
    await page.waitForTimeout(1000);
})

test('All form validation should work and all field is visible', async ({page}) => {
    await expect(page.getByText('Tambah Cabang Olahraga')).toBeVisible();

    // validate all step included
    await expect(page.getByRole('tab', {name: 'Detail Turnamen'})).toBeVisible();
    await expect(page.getByRole('tab', {name: 'Detail Penyelengaraan'})).toBeVisible();
    await expect(page.getByRole('tab', {name: 'Kategori Turnamen'})).toBeVisible();

    // cannot go to next step if all required field is not filled
    await page.getByRole('button', {name: 'Lanjut'}).click();
    await expect(page.getByText('Nama wajib diisi.')).toBeVisible();
    await expect(page.getByText('Cabang Olahraga wajib diisi.')).toBeVisible();
    await expect(page.getByText('Deskripsi wajib diisi.')).toBeVisible();


    // fill all required field for step 1
    await page.getByRole('textbox', {name: 'Nama'}).fill('Turnamen Test');
    await page.locator('[id="sportTypeOption"]').click();
    await page.waitForTimeout(500);
    await page.getByLabel('Karate').click();
    await page.getByLabel('Deskripsi').fill(fakeTournamentDescription);
    await page.getByRole('button', {name: 'Lanjut'}).click();
    await page.waitForTimeout(500);

    // cannot go to next step if all required field is not filled
    await page.getByRole('button', {name: 'Lanjut'}).click();
    await expect(page.getByText('Tanggal Mulai harus berisi tanggal setelah 2024-11-23.')).toBeVisible();
    await expect(page.getByText('Tanggal Selesai harus berisi tanggal setelah Invalid date.\n')).toBeVisible();
    await expect(page.getByText('Tanggal Mulai Pendaftaran harus berisi tanggal sebelum Invalid date.')).toBeVisible();
    await expect(page.getByText('Tanggal Selesai Pendaftaran harus berisi tanggal setelah Invalid date.')).toBeVisible();
    await expect(page.getByText('Orang yang Dapat Dihubungi wajib diisi.')).toBeVisible();
    await expect(page.getByText('Nomor Telepon wajib diisi.')).toBeVisible();

    await page.getByLabel('Tanggal Mulai', {exact: true}).click();
    await page.waitForTimeout(200);
    await page.locator('#datepicker-startDate').getByLabel('November 22,').click();
    await page.waitForTimeout(200);
    await expect(page.getByText('Tanggal Mulai harus berisi tanggal setelah 2024-11-23.')).toBeVisible();
    await page.getByLabel('Tanggal Mulai', {exact: true}).click();
    await page.waitForTimeout(200);
    await page.locator('#datepicker-startDate').getByLabel('November 29,').click();
    await page.waitForTimeout(200);
    await expect(page.getByText('Tanggal Mulai harus berisi tanggal setelah 2024-11-23.')).not.toBeVisible();


    await page.getByLabel('Tanggal Selesai', {exact: true}).click();
    await page.waitForTimeout(200);
    await page.locator('#datepicker-endDate').getByLabel('November 29,').click();
    await page.waitForTimeout(200);
    await expect(page.getByText('Tanggal Selesai harus berisi tanggal setelah 2024-11-29.')).toBeVisible();
    await page.getByLabel('Tanggal Selesai', {exact: true}).click();
    await page.waitForTimeout(200);
    await page.locator('#datepicker-endDate').getByLabel('November 30,').click();
    await page.waitForTimeout(200);
    await expect(page.getByText('Tanggal Selesai harus berisi tanggal setelah 2024-11-29.')).not.toBeVisible();

    await page.getByLabel('Tanggal Mulai Pendaftaran', {exact: true}).click();
    await page.waitForTimeout(200);
    await page.locator('#datepicker-registrationStartDate').getByLabel('November 30,').click();
    await page.waitForTimeout(200);
    await expect(page.getByText('Tanggal Mulai Pendaftaran harus berisi tanggal sebelum 2024-11-29.')).toBeVisible();
    await page.getByLabel('Tanggal Mulai Pendaftaran', {exact: true}).click();
    await page.waitForTimeout(200);
    await page.locator('#datepicker-registrationStartDate').getByLabel('November 1,').click();
    await page.waitForTimeout(200);
    await expect(page.getByText('Tanggal Mulai Pendaftaran harus berisi tanggal sebelum 2024-11-29.')).not.toBeVisible();


    await page.getByText('Tanggal Selesai Pendaftaran', {exact: true}).click();
    await page.waitForTimeout(200);
    await page.locator('#datepicker-registrationEndDate').getByLabel('December 1,').click();
    await page.waitForTimeout(200);
    await expect(page.getByText('Tanggal Selesai Pendaftaran harus berisi tanggal sebelum 2024-11-30.')).toBeVisible();
    await page.getByLabel('Tanggal Selesai Pendaftaran', {exact: true}).click();
    await page.waitForTimeout(200);
    await page.locator('#datepicker-registrationEndDate').getByLabel('November 29,').click();
    await page.waitForTimeout(200);
    await expect(page.getByText('Tanggal Selesai Pendaftaran harus berisi tanggal sebelum 2024-11-30.')).not.toBeVisible();


    await page.getByLabel('Orang yang Dapat Dihubungi').fill(fakeName);
    await expect(page.getByText('Orang yang Dapat Dihubungi wajib diisi.')).not.toBeVisible();

    await page.getByLabel('Nomor Telepon').fill('6281234567897');
    await expect(page.getByText('Nomor Telepon wajib diisi.')).not.toBeVisible();
    await page.waitForTimeout(500);

    // cannot submit if all required field is not filled

    await page.getByRole('button', {name: 'Lanjut'}).click();

    await expect(page.getByText('Kategori Turnamen #1')).toBeVisible();

    await page.getByRole('button', {name: 'Menyelesaikan'}).click();

    await page.waitForTimeout(500);

    await expect(page.getByText('Nama wajib diisi.')).toBeVisible();
    await expect(page.getByText('Jenis Penilaian wajib diisi.')).toBeVisible();

    await page.getByRole('textbox', {name: 'Nama'}).fill('Kategori Test 1');
    await page.getByLabel('Jenis Penilaian').click();
    await page.waitForTimeout(500);
    await page.getByLabel('Kata').click();
    await expect(page.getByText('Jenis Penilaian wajib diisi.')).not.toBeVisible()
})


test('Submit process run smoothly ', async ({page}) => {
    const tournamentCalls: { [key: string]: any }[] = []
    const tournamentCategoryCalls: { [key: string]: any }[] = []

    const tournamentId = faker.string.alpha(12);
    const category1Id = faker.string.alpha(12);


    await page.route('**/api/collections/tournaments/records?page=*&perPage=*&filter=*&skipTotal=*', route => route.fulfill({
        status: 200,
        body: JSON.stringify({"page": 1, "perPage": 1, "totalItems": -1, "totalPages": -1, "items": []})
    }))
    await page.route('**/api/collections/tournaments/records', route => {

        const request = route.request();
        tournamentCalls.push({
            url: request.url(),
            postData: request.postData(),
            method: request.method(),
        });

        return route.fulfill({
            status: 200,
            body: JSON.stringify({
                "categories": [],
                "collectionId": "ctkwj5buy7z88a0",
                "collectionName": "tournaments",
                "contactNumber": "+62338818219",
                "contactPerson": "Sukron",
                "created": "2024-11-23 12:14:38.597Z",
                "description": faker.lorem.paragraph(2),
                "endDate": "2024-12-02 00:00:00.000Z",
                "id": tournamentId,
                "isWaAvailable": true,
                "logo": "e3a1x_qf_ukrrjhh_ln_fn_fng_s9mjyWuJba.jpeg",
                "managedBy": fakeAdminId,
                "maxParticipation": 0,
                "name": "Tournament  Test 2",
                "pamflet": "e3a1x_qf_ukrrjhh_ln_fn_fng_LK0Kf2a92u.jpeg",
                "registrationEndDate": "2024-11-30 00:00:00.000Z",
                "registrationStartDate": "2024-11-01 00:00:00.000Z",
                "slug": "tournament-test-2",
                "sportType": fakeSportTypeId,
                "startDate": "2024-12-01 00:00:00.000Z",
                "status": "draft",
                "updated": "2024-11-23 12:14:38.597Z"
            })
        })
    })
    await page.route('**/api/collections/tournaments/records/*', route => {
        const request = route.request();
        tournamentCalls.push({
            url: request.url(),
            postData: request.postData(),
            method: request.method(),
            params: request.url().split('/').pop()
        });

        return route.fulfill({
            status: 200,
            body: JSON.stringify({
                "categories": [],
                "collectionId": "ctkwj5buy7z88a0",
                "collectionName": "tournaments",
                "contactNumber": "+62338818219",
                "contactPerson": "Sukron",
                "created": "2024-11-23 12:14:38.597Z",
                "description": faker.lorem.paragraph(2),
                "endDate": "2024-12-02 00:00:00.000Z",
                "id": tournamentId,
                "isWaAvailable": true,
                "logo": "e3a1x_qf_ukrrjhh_ln_fn_fng_s9mjyWuJba.jpeg",
                "managedBy": fakeAdminId,
                "maxParticipation": 0,
                "name": "Tournament  Test 2",
                "pamflet": "e3a1x_qf_ukrrjhh_ln_fn_fng_LK0Kf2a92u.jpeg",
                "registrationEndDate": "2024-11-30 00:00:00.000Z",
                "registrationStartDate": "2024-11-01 00:00:00.000Z",
                "slug": "tournament-test-2",
                "sportType": fakeSportTypeId,
                "startDate": "2024-12-01 00:00:00.000Z",
                "status": "draft",
                "updated": "2024-11-23 12:14:38.597Z"
            })
        })
    })
    await page.route('**/api/collections/tournamentCategories/records', route => {
        const request = route.request();
        tournamentCategoryCalls.push({
            url: request.url(),
            postData: request.postData(),
            method: request.method(),
        });

        return route.fulfill({
            status: 200,
            body: JSON.stringify({
                "collectionId": "sjo6ximgt4hfmxz",
                "collectionName": "tournamentCategories",
                "created": "2024-11-23 12:14:39.656Z",
                "id": category1Id,
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
                "updated": "2024-11-23 12:14:39.656Z"
            })
        })
    })

    await page.getByRole('textbox', {name: 'Nama'}).fill('Turnamen Test');
    await page.locator('[id="sportTypeOption"]').click();
    await page.waitForTimeout(500);
    await page.getByLabel('Karate').click();
    await page.getByLabel('Deskripsi').fill(fakeTournamentDescription);
    await page.getByRole('button', {name: 'Lanjut'}).click();
    await page.waitForTimeout(500);

    await page.getByLabel('Tanggal Mulai', {exact: true}).click();
    await page.waitForTimeout(200);
    await page.locator('#datepicker-startDate').getByLabel('November 29,').click();
    await page.waitForTimeout(200);

    await page.getByLabel('Tanggal Selesai', {exact: true}).click();
    await page.waitForTimeout(200);
    await page.locator('#datepicker-endDate').getByLabel('November 30,').click();
    await page.waitForTimeout(200);


    await page.getByLabel('Tanggal Mulai Pendaftaran', {exact: true}).click();
    await page.waitForTimeout(200);
    await page.locator('#datepicker-registrationStartDate').getByLabel('November 1,').click();
    await page.waitForTimeout(200);

    await page.getByLabel('Tanggal Selesai Pendaftaran', {exact: true}).click();
    await page.waitForTimeout(200);
    await page.locator('#datepicker-registrationEndDate').getByLabel('November 29,').click();
    await page.waitForTimeout(200);

    await page.getByLabel('Orang yang Dapat Dihubungi').fill(fakeName);
    await page.getByLabel('Nomor Telepon').fill('6281234567897');
    await page.getByRole('button', {name: 'Lanjut'}).click();
    await page.waitForTimeout(500);

    await page.getByRole('textbox', {name: 'Nama'}).fill('Kategori Test 1');
    await page.getByLabel('Jenis Penilaian').click();
    await page.waitForTimeout(500);
    await page.getByLabel('Kata').click();
    await page.getByLabel('Biaya Pendaftaran').fill('100000');

    await page.getByRole('button', {name: 'Menyelesaikan'}).click();
    await page.waitForTimeout(1000);


    expect(tournamentCalls.length).toBe(2);
    expect(tournamentCalls[0].method).toBe('POST');

    expect(tournamentCalls[0].postData).toContain(fakeSportTypeId);

    expect(tournamentCategoryCalls.length).toBe(1);
    expect(tournamentCategoryCalls[0].method).toBe('POST');

    expect(tournamentCategoryCalls[0].postData).toContain(tournamentId);
    expect(tournamentCategoryCalls[0].postData).toContain(kataScoringId);

    expect(tournamentCalls[1].method).toBe('PATCH');
    expect(tournamentCalls[1].params).toBe(tournamentId);
    expect(tournamentCalls[1].postData).toContain(category1Id);

})