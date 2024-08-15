import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionQuestionnairesComponent } from './action-questionnaires.component';

describe('ActionQuestionnairesComponent', () => {
  let component: ActionQuestionnairesComponent;
  let fixture: ComponentFixture<ActionQuestionnairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionQuestionnairesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionQuestionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
