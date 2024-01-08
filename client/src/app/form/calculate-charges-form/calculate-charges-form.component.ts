import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculate-charges-form',
  templateUrl: './calculate-charges-form.component.html',
  styleUrls: ['./calculate-charges-form.component.scss']
})
export class CalculateChargesFormComponent implements OnInit {
  calculateChargesForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.calculateChargesForm = this.formBuilder.group({
      id: ['', Validators.required],
      basicPricePerKg: [0, [Validators.required, Validators.min(0)]],
      year: [2023, Validators.required]
    });
  }

  onSubmit() {

    console.log('Calculated charges:');
  }

 
}
