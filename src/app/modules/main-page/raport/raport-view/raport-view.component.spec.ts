import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaportViewComponent } from './raport-view.component';

describe('RaportViewComponent', () => {
  let component: RaportViewComponent;
  let fixture: ComponentFixture<RaportViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaportViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
