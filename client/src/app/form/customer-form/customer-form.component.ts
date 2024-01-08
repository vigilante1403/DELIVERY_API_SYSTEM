import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent  implements OnInit {

  customerForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    
  }
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.required]
    });
  }
  onSubmit() {
    console.log(this.customerForm.value);
    
   }
}
