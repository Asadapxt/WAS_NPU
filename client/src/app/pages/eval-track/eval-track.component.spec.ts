import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalTrackComponent } from './eval-track.component';

describe('EvalTrackComponent', () => {
  let component: EvalTrackComponent;
  let fixture: ComponentFixture<EvalTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvalTrackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvalTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
