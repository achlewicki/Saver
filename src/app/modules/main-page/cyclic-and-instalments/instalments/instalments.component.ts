import { Component, OnInit } from '@angular/core';
import { MainPageService } from '#services/main-page-service/main-page.service';

@Component({
  selector: 'svr-instalments',
  templateUrl: './instalments.component.html',
  styleUrls: ['./instalments.component.scss']
})
export class InstalmentsComponent implements OnInit {

  protected addMode: boolean;

  constructor(
  ) { }

  ngOnInit(): void {
    this.addMode = false;
  }

}
