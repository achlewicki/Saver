import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsGroupComponent } from './operations-group.component';

describe('OperationsGroupComponent', () => {
  let component: OperationsGroupComponent;
  let fixture: ComponentFixture<OperationsGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationsGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
