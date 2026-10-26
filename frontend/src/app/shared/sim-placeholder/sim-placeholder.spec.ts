import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimPlaceholder } from './sim-placeholder';

describe('SimPlaceholder', () => {
  let component: SimPlaceholder;
  let fixture: ComponentFixture<SimPlaceholder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimPlaceholder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimPlaceholder);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('presetId', 'p1-explore');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resolve its planned preset', () => {
    expect(component.preset?.id).toBe('p1-explore');
  });
});
