import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationFiltersComponent } from './operation-filters.component';

describe('OperationFiltersComponent', () => {
  let component: OperationFiltersComponent;
  let fixture: ComponentFixture<OperationFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
