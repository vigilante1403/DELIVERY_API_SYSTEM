import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delivery-agent-form',
  templateUrl: './delivery-agent-form.component.html',
  styleUrls: ['./delivery-agent-form.component.scss']
})
export class DeliveryAgentFormComponent implements OnInit {

  deliveryAgentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.deliveryAgentForm = this.formBuilder.group({
      id: ['', Validators.required],
      name_of_agent: ['', Validators.required],
      vehicle_number: ['', Validators.required],
      contact_number: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }
  onSubmit() {
    console.log(this.deliveryAgentForm.value);
    
    }
}