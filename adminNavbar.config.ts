const navbarConfig = [
    {
        title: 'dashboard',
        icon: 'mdi-light:home',
        link: '/admin/dashboard',
        routeName: 'admin-dashboard',
        roles: ['admin', 'organizer']
    },
    {
        title: 'sportType',
        icon: 'mdi-light:script',
        link: '/admin/sport-type',
        routeName: 'admin-sport-type',
        roles: ['admin']
    },
    {
        title: 'tournament',
        icon: 'mdi-light:sitemap',
        link: '/admin/tournament',
        routeName: 'admin-tournament',
        roles: ['organizer']
    }
]

export default navbarConfig;