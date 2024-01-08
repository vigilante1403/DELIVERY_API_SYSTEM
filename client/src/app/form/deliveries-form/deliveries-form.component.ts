import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-deliveries-form',
  templateUrl: './deliveries-form.component.html',
  styleUrls: ['./deliveries-form.component.scss']
})
export class DeliveriesFormComponent implements OnInit {
  deliveriesForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.deliveriesForm = this.formBuilder.group({
      id: ['', Validators.required], 
      orderId: ['', Validators.required],
      agentId: ['', Validators.required],
      orderPaymentId: ['', Validators.required],
      deliveryDate: [new Date(), Validators.required], 
      status: ['inTransit', Validators.required]
    });
  }

  onSubmit(){
    console.log(this.deliveriesForm.value);
    
  }
}