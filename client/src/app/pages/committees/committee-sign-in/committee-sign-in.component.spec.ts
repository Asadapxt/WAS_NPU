import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeSignInComponent } from './committee-sign-in.component';

describe('CommitteeSignInComponent', () => {
  let component: CommitteeSignInComponent;
  let fixture: ComponentFixture<CommitteeSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommitteeSignInComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitteeSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
