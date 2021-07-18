import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaOverviewComponent } from './visa-overview.component';

describe('VisaOverviewComponent', () => {
  let component: VisaOverviewComponent;
  let fixture: ComponentFixture<VisaOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
