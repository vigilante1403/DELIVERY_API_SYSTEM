import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-payment-status-form',
  templateUrl: './order-payment-status-form.component.html',
  styleUrls: ['./order-payment-status-form.component.scss']
})
export class OrderPaymentStatusFormComponent implements OnInit {
  orderPaymentStatusForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.orderPaymentStatusForm = this.formBuilder.group({
      id: [''],
      statusname: ['', Validators.required]
    });
  }

  onSubmit() {
   
    console.log(this.orderPaymentStatusForm.value);
  }
}