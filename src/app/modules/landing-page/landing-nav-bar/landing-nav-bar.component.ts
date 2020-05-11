import {Component, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'svr-landing-nav-bar',
  templateUrl: './landing-nav-bar.component.html',
  styleUrls: ['./landing-nav-bar.component.scss']
})
export class LandingNavBarComponent implements OnInit {
  private navColor = '#FFFFFF';
  private inOrOut: string;
  private fontColor = '#000000';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // this.loaded = false;
    const yPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (yPosition > 100 && this.navColor !== '#0681f8') {
      this.navColor = '#0681f8';
      this.inOrOut = 'in';
      this.fontColor = '#FFFFFF';
    } else if (yPosition < 100) {
      this.navColor = '#FFFFFF';
      this.inOrOut = 'out';
      this.fontColor = '#000000';
    }
  }

  constructor(  ) {
  }

  ngOnInit() {
  }
}
