import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInquiryComponent } from './search-inquiry.component';

describe('SearchInquiryComponent', () => {
  let component: SearchInquiryComponent;
  let fixture: ComponentFixture<SearchInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchInquiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
