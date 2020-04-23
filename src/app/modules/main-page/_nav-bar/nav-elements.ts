
export const navElements: NavElement[] = [
    {
        name: 'dashboard',
        title: 'Tablica',
        icon: 'clipboard',
        url: '/main'
    },
    {
        name: 'operations',
        title: 'Transakcje',
        icon: 'exchange-alt',
        url: '/main/operations'
    },
    {
        name: 'categories',
        title: 'Kategorie',
        icon: 'list',
        url: '/main/categories'
    },
    {
        name: 'calendar',
        title: 'Kalendarz',
        icon: 'calendar-alt',
        url: '/main'
    },
    {
        name: 'raports',
        title: 'Raporty',
        icon: 'chart-bar',
        url: '/main/raports'
    },
    {
        name: 'achievements',
        title: 'Osiągnięcia',
        icon: 'award',
        url: '/main/achievements'
    }
];

interface NavElement {
    name: string;
    title: string;
    icon: string;
    url: string;
}
