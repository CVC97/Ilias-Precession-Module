import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalPendulum } from './physical-pendulum';

describe('PhysicalPendulum', () => {
  let component: PhysicalPendulum;
  let fixture: ComponentFixture<PhysicalPendulum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicalPendulum]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicalPendulum);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
