import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(({ vueApp }) => {
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

                // Homepage Navbar
                home: 'Halaman Utama',
                contactUs: 'Hubungi Kami',

                // Homepage Footer
               legal: 'Hukum',
                privacyPolicy: 'Kebijakan Privasi',
                termsAndConditions: 'Syarat dan Ketentuan',
                cookiePolicy: 'Kebijakan Cookie',

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



                // Login page
                loginFormTitle: 'Masuk ke Akunmu',
                loginSubtitle: `Masuk dan Mulai <br> Petualangan Kompetitifmu!`,
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




                // Brand identity
                headline: 'Tumbuh dan berkembang bersama kami.'

            }
        }
    })

    vueApp.use(i18n)
})