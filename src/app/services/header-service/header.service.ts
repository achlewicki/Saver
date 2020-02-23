import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public wideNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public viewTitle: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public toggleNavBar(): void {
    this.wideNavBar.next(!this.wideNavBar.value);
  }
}
