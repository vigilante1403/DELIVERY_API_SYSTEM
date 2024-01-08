import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delivery-service-form',
  templateUrl: './delivery-service-form.component.html',
  styleUrls: ['./delivery-service-form.component.scss']
})
export class DeliveryServiceFormComponent implements OnInit{
deliveryServiceForm!: FormGroup;
constructor(private fb: FormBuilder){}
ngOnInit(): void {
  this.deliveryServiceForm = this.fb.group({
    id: ['', [Validators.required]],
    type_name: ['normalPost', [Validators.required]],
    price: ['', [Validators.required]],
    prePaid: [false, [Validators.required]],
    collect: [true, [Validators.required]],
    dayAdd: ['oneDay', [Validators.required]],
  })
}
onSubmit(){
  console.log(this.deliveryServiceForm.value);
  
}
}
