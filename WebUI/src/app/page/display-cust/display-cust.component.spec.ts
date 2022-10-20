import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCustComponent } from './display-cust.component';

describe('DisplayCustComponent', () => {
  let component: DisplayCustComponent;
  let fixture: ComponentFixture<DisplayCustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCustComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
