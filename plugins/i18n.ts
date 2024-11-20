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
                save: 'Simpan',
                noData: 'Tidak ada data',


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
                sportType: 'Jenis Olahraga',
                tournament: 'Turnamen',

                // Sport type page
                sportTypeTitle: 'Jenis Olahraga',
                addSportType: 'Tambah Jenis Olahraga',
                editSportType: 'Ubah Jenis Olahraga',
                sportTypeForm: 'Formulir Jenis Olahraga',
                scoringTypeTitleForm: 'Form Jenis Penilaian',
                scoringType: 'Jenis Penilaian',
                successCreateSportType: 'Jenis olahraga berhasil dibuat!',
                activateSportType: 'Aktifkan Jenis Olahraga',
                deactivateSportType: 'Nonaktifkan Jenis Olahraga',
                successUpdateSportType: 'Jenis olahraga berhasil diubah!',

                // Tournament page
                tournamentTitle: 'Turnamen',
                addTournament: 'Tambah Turnamen',
                editTournament: 'Ubah Turnamen',
                tournamentForm: 'Formulir Turnamen',
                successCreateTournament: 'Turnamen berhasil dibuat!',
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