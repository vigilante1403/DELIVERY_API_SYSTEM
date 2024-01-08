import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.scss']
})
export class OrdersFormComponent implements OnInit {
  ordersForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.ordersForm = this.formBuilder.group({
      id: [''],
      customerId: ['', Validators.required],
      contactAddress: ['', Validators.required],
      deliveryTypeId: ['', Validators.required],
      prePaid: [false],
      orderDate: [new Date(), Validators.required],
      status: ['processing', Validators.required],
      orderPaymentId: ['']
    });
  }

  onSubmit() {
   
    console.log(this.ordersForm.value);
  }
}
