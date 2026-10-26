import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P4Gyroscope } from './p4-gyroscope';

describe('P4Gyroscope', () => {
  let component: P4Gyroscope;
  let fixture: ComponentFixture<P4Gyroscope>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [P4Gyroscope]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P4Gyroscope);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
