import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGatewayDialogComponent } from './payment-gateway-dialog.component';

describe('PaymentGatewayDialogComponent', () => {
  let component: PaymentGatewayDialogComponent;
  let fixture: ComponentFixture<PaymentGatewayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentGatewayDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentGatewayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
