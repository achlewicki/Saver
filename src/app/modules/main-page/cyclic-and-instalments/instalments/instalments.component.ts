import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'svr-instalments',
  templateUrl: './instalments.component.html',
  styleUrls: ['./instalments.component.scss']
})
export class InstalmentsComponent implements OnInit {

  protected addMode: boolean;

  ngOnInit(): void {
    this.addMode = false;
  }

}
