import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordForgetComponent } from './password-forget.component';

describe('PasswordForgetComponent', () => {
  let component: PasswordForgetComponent;
  let fixture: ComponentFixture<PasswordForgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordForgetComponent]
    });
    fixture = TestBed.createComponent(PasswordForgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
