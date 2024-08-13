import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerModalComponent } from './volunteer-modal.component';

describe('VolunteerModalComponent', () => {
  let component: VolunteerModalComponent;
  let fixture: ComponentFixture<VolunteerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteerModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
