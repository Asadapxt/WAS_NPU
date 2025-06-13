import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairmanFormComponent } from './chairman-form.component';

describe('ChairmanFormComponent', () => {
  let component: ChairmanFormComponent;
  let fixture: ComponentFixture<ChairmanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChairmanFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChairmanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
