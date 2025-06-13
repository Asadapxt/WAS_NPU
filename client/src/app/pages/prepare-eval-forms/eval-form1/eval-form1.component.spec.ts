import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalForm1Component } from './eval-form1.component';

describe('EvalForm1Component', () => {
  let component: EvalForm1Component;
  let fixture: ComponentFixture<EvalForm1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvalForm1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvalForm1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
