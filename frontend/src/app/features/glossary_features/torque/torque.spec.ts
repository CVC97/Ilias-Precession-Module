import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Torque } from './torque';

describe('Torque', () => {
  let component: Torque;
  let fixture: ComponentFixture<Torque>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Torque]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Torque);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
