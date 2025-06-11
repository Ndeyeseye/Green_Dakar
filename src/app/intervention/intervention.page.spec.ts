import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterventionPage } from './intervention.page';

describe('InterventionPage', () => {
  let component: InterventionPage;
  let fixture: ComponentFixture<InterventionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
