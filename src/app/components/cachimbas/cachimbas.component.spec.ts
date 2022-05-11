import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CachimbasComponent } from './cachimbas.component';

describe('CachimbasComponent', () => {
  let component: CachimbasComponent;
  let fixture: ComponentFixture<CachimbasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CachimbasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CachimbasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
