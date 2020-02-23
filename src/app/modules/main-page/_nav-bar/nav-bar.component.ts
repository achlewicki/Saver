import { HeaderService } from '#services/header-service/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'svr-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  protected isWide: boolean;

  constructor(private hservice: HeaderService) { }

  ngOnInit(): void {
    this.hservice.wideNavBar.subscribe(
      (status: boolean) => this.isWide = status
    );
  }
}
