import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterMairiePage } from './register-mairie.page';

describe('RegisterMairiePage', () => {
  let component: RegisterMairiePage;
  let fixture: ComponentFixture<RegisterMairiePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMairiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
