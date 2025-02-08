import {createI18n} from 'vue-i18n'

export default defineNuxtPlugin(({vueApp}) => {
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: 'id',
        messages: {
            id: {
                // General
                or: 'Atau',
                changeData: 'Ubah Data',
                addData: 'Tambah Data',
                activatedData: 'Publikasi Data',
                save: 'Simpan',
                noData: 'Tidak ada data',
                logo: 'Logo',
                pamflet: 'Pamflet',
                startDate: 'Tanggal Mulai',
                endDate: 'Tanggal Selesai',
                registrationStartDate: 'Tanggal Mulai Pendaftaran',
                registrationEndDate: 'Tanggal Selesai Pendaftaran',
                contactPerson: 'Orang yang Dapat Dihubungi',
                phoneNumber: 'Nomor Telepon',
                isWaAvailable: 'Apakah Dapat Dihubungi Melalui WhatsApp?',
                phoneNumberFormat: 'Format Nomor Handphone: 628xx-xxxx-xxxx',
                leaveZeroIfFree: 'Masukan angka 0 jika biaya gratis',
                registrationFee: 'Biaya Pendaftaran',
                isIndividual: 'Pertadingan Individu',
                minTeamMember: 'Jumlah Anggota Tim Minimum',
                maxTeamMember: 'Jumlah Anggota Tim Maksimum',
                isAgeRestriction: 'Batasan Usia?',
                minAge: 'Usia Minimum',
                maxAge: 'Usia Maksimum',
                sortBy: 'Urutkan Berdasarkan',
                newest: 'Terbaru',
                eventComingSoon: 'Event Akan Datang',
                eventFinished: 'Event Telah Berakhir',
                search: 'Cari',
                unauthorized: 'Tidak diizinkan',
                yes: 'Ya',
                no: 'Tidak',
                logout: 'Keluar',
                profile: 'Profil',
                myRegistration: 'Pendaftaran Saya',
                account: 'Akun',
                notification: 'Notifikasi',
                specificSetting: 'Pengaturan Khusus',
                myTeam: 'Tim Saya',
                isValid: 'Tervalidasi',
                athlete: 'Atlet',
                seeDetail: 'Lihat Detail',
                match: 'Pertandingan',
                tatami: 'Tatami',

                // setting page
                general: 'Pengaturan Umum',
                registrationCount: 'Jumlah Pendaftaran',
                feeRegistrationTotal: 'Total Biaya Pendaftaran',
                eventDate: 'Tanggal Acara',
                lastDateRegistration: 'Batas Pendaftaran',
                validationTime: 'Waktu Validasi',
                detailRegistration: 'Detail Pendaftaran',
                printInvoice: 'Cetak Invoice',
                uploadProof: 'Unggah Bukti Pembayaran',
                paymentProof: 'Bukti Pembayaran',
                seePaymentProof: 'Lihat Bukti Pembayaran',
                listParticipation: 'Daftar Peserta',
                registrationAt: 'Tanggal Daftar',
                deleteRegistration: 'Hapus Pendaftaran',
                deleteRegistrationConfirmation: 'Apakah kamu yakin ingin menghapus pendaftaran ini? Tindakan ini bersifat permanen dan tidak bisa dibatalkan',
                validateRegistrationConfirmation: 'Apakah kamu yakin ingin memvalidasi pendaftaran ini?',

                // Notification message
                newRegistrantForTournament: 'Pendaftar baru untuk turnamen',
                newRegistrantForTournamentDescription: '{team} baru saja mendaftar untuk kategori {category} pada turnamen {tournament}',
                noNotification: 'Tidak ada notifikasi',

                // Homepage Navbar
                home: 'Halaman Utama',
                contactUs: 'Hubungi Kami',


                // Homepage Footer
                legal: 'Hukum',
                privacyPolicy: 'Kebijakan Privasi',
                termsAndConditions: 'Syarat dan Ketentuan',
                cookiePolicy: 'Kebijakan Cookie',
                copyRigth: 'Hak Cipta',

                // List tournament page
                tournamentList: 'Daftar Turnamen',

                // Tournament detail page
                category: 'Kategori',
                registrant: 'Pendaftar',
                matchResult: 'Hasil Pertandingan',
                standings: 'Klasemen',
                gallery: 'Galeri',
                individual: 'Perorangan',
                team: 'Berkelompok',
                year: 'Thn',
                teamSingular: 'Kelompok',
                free: 'Gratis',
                tournamentNotFound: 'Turnamen tidak ditemukan',
                tournamentNotFoundDescription: 'Turnamen yang anda cari tidak ditemukan atau terjadi kesalah silakan cek kemabli link yang anda dapatkan',
                position: 'Posisi',
                gold: 'Emas',
                silver: 'Perak',
                bronze: 'Perunggu',
                addNewRound: 'Tambah putaran baru',
                addKataMatch: 'Tambah grup pertandingan kata',
                deleteRound: 'Hapus putaran',
                doDraw: 'Lakukan pengundian',
                notYetValid: 'Belum tervalidasi',
                areYouSureWantToDraw: 'Apakah anda yakin ingin melakukan pengundian? Semua data pertandingan akan direset',
                noRegistrant: 'Tidak ada pendaftar',
                openTatamiMatch: 'Buka Tatami',
                addNewTatami: 'Tambah tatami baru',
                removeTatami: 'Hapus tatami',



                // Tournament registration page
                registration: 'Pendaftaran',
                tournamentRegistration: 'Pendaftaran Turnamen',
                participantList: 'Daftar Peserta',
                athleteDetail: 'Detail Atlet',
                athletePicture: 'Foto Atlet',
                gender: 'Jenis Kelamin',
                man: 'Pria',
                registartionFee: 'Biaya Pendaftaran',
                woman: 'Wanita',
                dob: 'Tanggal Lahir',
                useExistingAthlete: 'Daftarkan Atlet yang Sudah Ada',
                individualCategoryError: 'Kategori individu hanya bisa diisi oleh satu peserta',
                teamCategoryError: 'Kategori tim harus diisi oleh minimal {min} dan maksimal {max} peserta',
                teamCategoryInfo: 'Masukan peserta yang akan ikut dalam kategori pertandingan ini dengan minimal {min} perserta dan maksimal {max} peserta',
                individualCategoryInfo: 'Masukan peserta yang akan ikut dalam kategori pertandingan ini',
                registerSuccessDescription: 'Apakah anda ingin mendaftarkan peserta lain?',
                ageRestrictiveNotification: 'Kategori ini memiliki batas usia peserta yang berusia antara {min} sampai {max} tahun, pesan ini hanya peringatan dan tidak mempengaruhi proses pendaftaran',

                // Login and register page
                registerSuccess: 'Pendaftaran anda berhasil!',
                registerError: 'Pendaftaran anda gagal!',
                loginSuccess: 'Login berhasil!',
                loginError: 'Login gagal!',

                // Register page
                registerFormTitle: 'Pendafatarn Tim',
                teamName: 'Nama Tim',
                retypePassword: 'Ulangi kata sandi',
                register: 'Daftar',
                alreadyHaveAccount: 'Sudah punya akun?',
                registerFormTitlePrganizer: 'Pendaftaran Penyelenggara',
                organizerName: 'Nama Penyelenggara',


                // Admin page sidebar
                dashboard: 'Dasbor',
                sportType: 'Cabang Olahraga',
                tournament: 'Turnamen',

                // Sport type page
                sportTypeTitle: 'Cabang Olahraga',
                addSportType: 'Tambah Cabang Olahraga',
                editSportType: 'Ubah Cabang Olahraga',
                sportTypeForm: 'Formulir Cabang Olahraga',
                scoringTypeTitleForm: 'Form Jenis Penilaian',
                scoringType: 'Jenis Penilaian',
                successCreateSportType: 'Cabang olahraga berhasil dibuat!',
                activateSportType: 'Aktifkan Cabang Olahraga',
                deactivateSportType: 'Nonaktifkan Cabang Olahraga',
                successUpdateSportType: 'Cabang olahraga berhasil diubah!',

                // Tournament page
                tournamentTitle: 'Turnamen',
                addTournament: 'Tambah Turnamen',
                editTournament: 'Ubah Turnamen',
                tournamentDetail: 'Detail Turnamen',
                eventDetail: 'Detail Penyelengaraan',
                tournamentCategory: 'Kategori Turnamen',
                tournamentForm: 'Formulir Turnamen',
                successCreateTournament: 'Turnamen berhasil dibuat!',
                failedCreateTournament: 'Turnamen gagal dibuat!',
                successUpdateTournament: 'Turnamen berhasil diubah!',
                validateRegistration: 'Validasi Pendaftaran',


                // Login page
                loginFormTitle: 'Masuk ke Akunmu',
                loginSubtitle: `Masuk dan Mulai Petualangan Kompetitifmu!`,
                email: 'Email',
                password: 'Kata Sandi',
                loginButton: 'Masuk',
                registerButton: 'Daftar',
                forgotPassword: 'Lupa Kata Sandi?',
                dontHaveAccount: 'Belum punya akun?',
                registerHere: 'Daftar di sini',
                makeOrganizerAccount: 'Buat akun sebagai penyelenggara',


                // Form input
                name: 'Nama',
                status: 'Status',
                description: 'Deskripsi',


                // Tatami page
                listCategory: 'Daftar Kategori',
                highlightMatch: 'Sorot Pertandingan',
                unHighLightMatch: 'Hapus Sorotan Pertandingan',
                matchDetail: 'Detail Pertandingan',
                addSecond: 'Tambah 1 Detik',
                subtractSecond: 'Kurangi 1 Detik',


                // Brand identity
                headline: 'Tumbuh dan berkembang bersama kami.',


                // Error message
                generalUnauthorized: 'Anda tidak diizinkan',
                generalDataNotFound: 'Data tidak ditemukan',
                generalDataNotFoundMessage: 'Data yang anda cari tidak ditemukan atau terjadi kesalahan, silakan coba lagi',
                onlyAdminMessage: 'Hanya admin yang dizinkan mengakses menu ini, anda tidak berhak mengasesnya !',
                onlyOrganizer: 'Hanya organizer yang dizinkan mengakses menu ini, anda tidak berhak mengasesnya !',
                processFailed: 'Proses gagal silahkan coba lagi',
                duplicateRegistrant: 'Peserta sudah terdaftar',
                duplicateAthleteInTeam: 'Ada atlet yang sama dalam satu tim, mohon cek kembali data kamu',
                thisAthleteNotYetMetAgeRequirement: 'Atlet ini belum memenuhi batas usia yang ditentukan',
            }
        }
    })

    vueApp.use(i18n)
})