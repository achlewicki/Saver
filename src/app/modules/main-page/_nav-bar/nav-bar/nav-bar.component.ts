import { Component, OnInit } from '@angular/core';
import { MainPageService } from '#services/main-page-service/main-page.service';


@Component({
  selector: 'svr-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  // protected accountName: string;
  protected isWide = true;

  protected toggleNavWidth(): void {
    this.isWide = !this.isWide;
  }

  constructor(private mpservice: MainPageService) {
  }

  ngOnInit(): void {
    // this.mpservice.activeAccount.subscribe(
    //   (result) => this.accountName = result.name
    // );
  }
}

