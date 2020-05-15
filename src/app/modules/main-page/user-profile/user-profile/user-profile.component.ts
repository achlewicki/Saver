import { Component, OnInit } from '@angular/core';
import { MainPageService } from '#services/main-page-service/main-page.service';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'svr-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(
    private readonly mpservice: MainPageService
  ) { }

  ngOnInit(): void {
    this.mpservice.activeView.next({
      name: 'user-profile',
      title: 'Profil',
      icon: faUserAlt
    });
  }

}
