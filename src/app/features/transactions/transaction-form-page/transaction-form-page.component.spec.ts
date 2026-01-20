import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFormPageComponent } from './transaction-form-page.component';

describe('TransactionFormPageComponent', () => {
  let component: TransactionFormPageComponent;
  let fixture: ComponentFixture<TransactionFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
