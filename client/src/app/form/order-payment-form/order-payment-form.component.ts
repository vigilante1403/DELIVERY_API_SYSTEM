import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-payment-form',
  templateUrl: './order-payment-form.component.html',
  styleUrls: ['./order-payment-form.component.scss']
})
export class OrderPaymentFormComponent implements OnInit {
  orderPaymentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.orderPaymentForm = this.formBuilder.group({
      id: [''],
      orderId: ['', Validators.required],
      subtotal: [0, Validators.required],
      prepaid: [0],
      service_price: [0, Validators.required],
      distance_charges: [0, Validators.required],
      totalCharges: [0], // Được tính toán tự động
      status: ['waiting', Validators.required]
    });

   
    const subtotalControl = this.orderPaymentForm.get('subtotal')?.valueChanges;
  
    if (subtotalControl) {
      subtotalControl.subscribe(subtotal => {
        const totalCharges = subtotal + this.orderPaymentForm.value.prepaid +
                            this.orderPaymentForm.value.service_price +
                            this.orderPaymentForm.value.distance_charges;
        this.orderPaymentForm.patchValue({ totalCharges });
      });
    }
  }

  onSubmit() {
    // Xử lý submit form ở đây
    console.log(this.orderPaymentForm.value);
  }
}
