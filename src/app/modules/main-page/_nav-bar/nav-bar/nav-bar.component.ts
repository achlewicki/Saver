import { Component } from '@angular/core';


@Component({
  selector: 'svr-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  protected isWide = true;

  protected toggleNavWidth(): void {
    this.isWide = !this.isWide;
  }

}

