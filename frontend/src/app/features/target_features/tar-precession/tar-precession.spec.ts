import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarPrecession } from './tar-precession';

describe('TarPrecession', () => {
  let component: TarPrecession;
  let fixture: ComponentFixture<TarPrecession>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarPrecession]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarPrecession);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
