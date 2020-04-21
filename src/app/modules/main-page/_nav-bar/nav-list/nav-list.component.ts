import { navElements } from './../nav-elements';
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
  protected navElements = navElements;

  constructor(private readonly mpService: MainPageService) {
    this.mpService.activeView.subscribe(view => this.setActiveElement(view.name));
  }

  public setActiveElement(name: string): void {
    const result = this.navElements.find(item => item.name === name);
    this.activeElementName = result ? result.name : '';
  }

}
