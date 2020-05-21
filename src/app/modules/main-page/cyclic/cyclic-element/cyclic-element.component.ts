import { Component, OnInit } from '@angular/core';
import {faAlignLeft, faHourglassHalf} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'svr-cyclic-element',
  templateUrl: './cyclic-element.component.html',
  styleUrls: ['./cyclic-element.component.scss']
})
export class CyclicElementComponent implements OnInit {

  descriptionBoxVisible = false;
  protected descriptionIcon = faAlignLeft;
  protected nextCyclicIcon = faHourglassHalf;

  constructor() { }

  ngOnInit() {
  }
}
