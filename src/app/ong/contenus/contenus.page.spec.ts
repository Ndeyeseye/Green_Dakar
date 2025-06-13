import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContenusPage } from './contenus.page';

describe('ContenusPage', () => {
  let component: ContenusPage;
  let fixture: ComponentFixture<ContenusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
