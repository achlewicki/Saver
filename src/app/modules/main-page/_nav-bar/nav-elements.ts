
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
        url: '/main/events'
    },
    {
        name: 'reports',
        title: 'Raporty',
        icon: 'chart-bar',
        url: '/main/reports'
    },
    {
        name: 'achievements',
        title: 'Osiągnięcia',
        icon: 'award',
        url: '/main/achievements'
    },
    {
      name: 'predictions',
      title: 'Prognozy',
      icon: 'search-dollar',
      url: '/main/predictions'
    },
    {
      name: 'cyclic',
      title: 'Raty i Cykliczne',
      icon: 'hourglass-half',
      url: '/main/cyclic'
    }
];

interface NavElement {
    name: string;
    title: string;
    icon: string;
    url: string;
}
