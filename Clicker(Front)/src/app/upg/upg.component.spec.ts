import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgComponent } from './upg.component';

describe('UpgComponent', () => {
  let component: UpgComponent;
  let fixture: ComponentFixture<UpgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpgComponent]
    });
    fixture = TestBed.createComponent(UpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
