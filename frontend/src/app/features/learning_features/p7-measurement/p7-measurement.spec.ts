import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P7Measurement } from './p7-measurement';

describe('P7Measurement', () => {
  let component: P7Measurement;
  let fixture: ComponentFixture<P7Measurement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [P7Measurement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P7Measurement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
