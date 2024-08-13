import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalledDonorCardComponent } from './called-donor-card.component';

describe('CalledDonorCardComponent', () => {
  let component: CalledDonorCardComponent;
  let fixture: ComponentFixture<CalledDonorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalledDonorCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalledDonorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
