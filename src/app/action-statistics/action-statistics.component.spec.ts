import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionStatisticsComponent } from './action-statistics.component';

describe('ActionStatisticsComponent', () => {
  let component: ActionStatisticsComponent;
  let fixture: ComponentFixture<ActionStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
