import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTurnoComponent } from './eliminar-turno.component';

describe('EliminarTurnoComponent', () => {
  let component: EliminarTurnoComponent;
  let fixture: ComponentFixture<EliminarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarTurnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
