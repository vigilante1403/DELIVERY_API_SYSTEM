import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-orders-status-form',
  templateUrl: './orders-status-form.component.html',
  styleUrls: ['./orders-status-form.component.scss']
})
export class OrdersStatusFormComponent implements OnInit {
  ordersStatusForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.ordersStatusForm = this.formBuilder.group({
      id: [''],
      statusName: ['', Validators.required]
    });
  }

  onSubmit() {
   
    console.log(this.ordersStatusForm.value);
  }
}
