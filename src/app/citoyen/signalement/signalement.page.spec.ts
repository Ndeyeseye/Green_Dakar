import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignalementPage } from './signalement.page';

describe('SignalementPage', () => {
  let component: SignalementPage;
  let fixture: ComponentFixture<SignalementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
