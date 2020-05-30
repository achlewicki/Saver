import {Component, Input, OnInit} from '@angular/core';
import {faAlignLeft, faHourglassHalf} from '@fortawesome/free-solid-svg-icons';
import {CyclicModel} from '#models/cyclic.model';

@Component({
  selector: 'svr-cyclic-element',
  templateUrl: './cyclic-element.component.html',
  styleUrls: ['./cyclic-element.component.scss']
})
export class CyclicElementComponent implements OnInit {
  @Input() protected cyclic: CyclicModel;
  descriptionBoxVisible = false;
  protected descriptionIcon = faAlignLeft;
  protected nextCyclicIcon = faHourglassHalf;

  constructor() { }

  ngOnInit() {
  }
}
