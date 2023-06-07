import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginvetComponent } from './loginvet.component';

describe('LoginvetComponent', () => {
  let component: LoginvetComponent;
  let fixture: ComponentFixture<LoginvetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginvetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginvetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
