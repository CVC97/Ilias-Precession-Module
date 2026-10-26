import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularVelocity } from './angular-velocity';

describe('AngularVelocity', () => {
  let component: AngularVelocity;
  let fixture: ComponentFixture<AngularVelocity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularVelocity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularVelocity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
