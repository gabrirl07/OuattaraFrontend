import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResellersDetailsComponent } from './resellers-details.component';

describe('ResellersDetailsComponent', () => {
  let component: ResellersDetailsComponent;
  let fixture: ComponentFixture<ResellersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResellersDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResellersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
