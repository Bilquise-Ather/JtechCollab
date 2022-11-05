import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAdvanceFilterComponent } from './custom-advance-filter.component';

describe('CustomAdvanceFilterComponent', () => {
  let component: CustomAdvanceFilterComponent;
  let fixture: ComponentFixture<CustomAdvanceFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomAdvanceFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAdvanceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
