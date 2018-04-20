import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColinComponent } from './colin.component';

describe('ColinComponent', () => {
  let component: ColinComponent;
  let fixture: ComponentFixture<ColinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
