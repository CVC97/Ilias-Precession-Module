import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P6Nutation } from './p6-nutation';

describe('P6Nutation', () => {
  let component: P6Nutation;
  let fixture: ComponentFixture<P6Nutation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [P6Nutation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P6Nutation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
