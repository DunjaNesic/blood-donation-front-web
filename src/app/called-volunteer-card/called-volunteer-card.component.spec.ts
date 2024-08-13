import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalledVolunteerCardComponent } from './called-volunteer-card.component';

describe('CalledVolunteerCardComponent', () => {
  let component: CalledVolunteerCardComponent;
  let fixture: ComponentFixture<CalledVolunteerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalledVolunteerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalledVolunteerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
