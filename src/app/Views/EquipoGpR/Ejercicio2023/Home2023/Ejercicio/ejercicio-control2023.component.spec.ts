import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioControl2023Component } from './ejercicio-control2023.component';

describe('EjercicioControl2023Component', () => {
  let component: EjercicioControl2023Component;
  let fixture: ComponentFixture<EjercicioControl2023Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjercicioControl2023Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioControl2023Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
