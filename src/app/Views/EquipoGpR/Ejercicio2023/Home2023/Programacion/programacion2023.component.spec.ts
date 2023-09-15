import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Programacion2023Component } from './programacion2023.component';

describe('Programacion2023Component', () => {
  let component: Programacion2023Component;
  let fixture: ComponentFixture<Programacion2023Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Programacion2023Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Programacion2023Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
