import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delivery-status-form',
  templateUrl: './delivery-status-form.component.html',
  styleUrls: ['./delivery-status-form.component.scss']
})
export class DeliveryStatusFormComponent implements OnInit {
  deliveryStatusForm!: FormGroup;
  statusName: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.deliveryStatusForm = this.formBuilder.group({
      id: ['', Validators.required],
      statusName: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  onSubmit(){
    console.log(this.deliveryStatusForm.value);
    
  }
}