import { MainPageService } from '#services/main-page-service/main-page.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'svr-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent {

  @Input()
  protected shortVersion: boolean;

  protected activeElementName: string;

  protected navElements: NavElement[] = [
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
      url: '/main'
    },
    {
      name: 'achievements',
      title: 'Osiągnięcia',
      icon: 'award',
      url: '/main'
    }
  ];

  constructor(private readonly mpService: MainPageService) {
    this.mpService.activeView.subscribe(view => this.setActiveElement(view.name));
  }

  public setActiveElement(name: string): void {
    const result = this.navElements.find(item => item.name === name);
    this.activeElementName = result ? result.name : '';
  }

}

interface NavElement {
  name: string;
  title: string;
  icon: string;
  url: string;
}
