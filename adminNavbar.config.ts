const navbarConfig = [
    {
        title: 'Dashboard',
        icon: 'mdi-light:home',
        link: '/admin/dashboard',
        routeName: 'admin-dashboard',
        roles: ['admin', 'organizer']
    },
    {
        title: 'Cabang olahraga',
        icon: 'mdi-light:home',
        link: '/admin/sport-type',
        routeName: 'admin-sport-type',
        roles: ['admin']
    },
    {
        title: 'Turnamen',
        icon: 'mdi-light:home',
        link: '/admin/tournament',
        routeName: 'admin-tournament',
        roles: ['organizer']
    }
]

export default navbarConfig;