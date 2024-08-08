import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotifinalPage } from './notifinal.page';

describe('NotifinalPage', () => {
  let component: NotifinalPage;
  let fixture: ComponentFixture<NotifinalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifinalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
