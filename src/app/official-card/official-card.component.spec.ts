import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialCardComponent } from './official-card.component';

describe('OfficialCardComponent', () => {
  let component: OfficialCardComponent;
  let fixture: ComponentFixture<OfficialCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficialCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficialCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
