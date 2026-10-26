import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantaneousAxis } from './instantaneous-axis';

describe('InstantaneousAxis', () => {
  let component: InstantaneousAxis;
  let fixture: ComponentFixture<InstantaneousAxis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstantaneousAxis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstantaneousAxis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
