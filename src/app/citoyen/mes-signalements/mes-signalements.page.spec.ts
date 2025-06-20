import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesSignalementsPage } from './mes-signalements.page';

describe('MesSignalementsPage', () => {
  let component: MesSignalementsPage;
  let fixture: ComponentFixture<MesSignalementsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MesSignalementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
