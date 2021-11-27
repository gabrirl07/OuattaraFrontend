import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResellersListComponent } from './resellers-list.component';

describe('ResellersListComponent', () => {
  let component: ResellersListComponent;
  let fixture: ComponentFixture<ResellersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResellersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResellersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
