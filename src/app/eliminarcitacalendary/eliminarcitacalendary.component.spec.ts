import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarcitacalendaryComponent } from './eliminarcitacalendary.component';

describe('EliminarcitacalendaryComponent', () => {
  let component: EliminarcitacalendaryComponent;
  let fixture: ComponentFixture<EliminarcitacalendaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarcitacalendaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarcitacalendaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
