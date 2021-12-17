import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaRequestListComponent } from './visa-request-list.component';

describe('VisaRequestListComponent', () => {
  let component: VisaRequestListComponent;
  let fixture: ComponentFixture<VisaRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
