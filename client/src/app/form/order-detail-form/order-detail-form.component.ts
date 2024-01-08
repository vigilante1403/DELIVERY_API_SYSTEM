import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail-form.component.html',
  styleUrls: ['./order-detail-form.component.scss']
})
export class OrderDetailFormComponent implements OnInit {
  orderDetailForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.orderDetailForm = this.formBuilder.group({
      id: ['', Validators.required],
      orderId: ['', Validators.required],
      parcelId: ['']
    });
  }
  onSubmit() {
  console.log(this.orderDetailForm.value);
  
  }
}