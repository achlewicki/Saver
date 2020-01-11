import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  @Output() fire: EventEmitter<any> = new EventEmitter();

  constructor() {}

  change() {
    this.fire.emit(false);
  }

  getEmittedValue() {
    return this.fire;
  }

}
