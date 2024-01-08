import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parcels-form',
  templateUrl: './parcels-form.component.html',
  styleUrls: ['./parcels-form.component.scss']
})
export class ParcelsFormComponent implements OnInit {
  parcelsForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.parcelsForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      weight: [0, Validators.required],
      imageUrl: ['', Validators.required],
      customerId: ['', Validators.required]
    });
  }

  onSubmit() {
  
    console.log(this.parcelsForm.value);
  }
}
