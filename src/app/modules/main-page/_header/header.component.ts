import { HeaderService } from '#services/header-service/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'svr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  protected title: string;

  constructor(private hservice: HeaderService) { }

  ngOnInit() {
    this.hservice.viewTitle.subscribe((title: string) => this.title = title);
  }

  protected toggleNavBar(): void {
    this.hservice.toggleNavBar();
  }
}
