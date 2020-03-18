import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsViewComponent } from './operations-view.component';

describe('OperationsComponent', () => {
  let component: OperationsViewComponent;
  let fixture: ComponentFixture<OperationsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OperationsViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
