import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nutation } from './nutation';

describe('Nutation', () => {
  let component: Nutation;
  let fixture: ComponentFixture<Nutation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nutation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nutation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
