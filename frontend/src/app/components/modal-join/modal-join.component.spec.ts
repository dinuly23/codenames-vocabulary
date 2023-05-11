import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalJoinComponent } from './modal-join.component';

describe('ModalJoinComponent', () => {
  let component: ModalJoinComponent;
  let fixture: ComponentFixture<ModalJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalJoinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
