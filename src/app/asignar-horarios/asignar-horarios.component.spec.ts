import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarHorariosComponent } from './asignar-horarios.component';

describe('AsignarHorariosComponent', () => {
  let component: AsignarHorariosComponent;
  let fixture: ComponentFixture<AsignarHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarHorariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
