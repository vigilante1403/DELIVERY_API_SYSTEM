import { Component } from '@angular/core';

@Component({
  selector: 'app-test-line',
  templateUrl: './test-line.component.html',
  styleUrls: ['./test-line.component.scss']
})
export class TestLineComponent {
  currentStep: number = 1;

  // Function to move to the next step
  nextStep(): void {
    if (this.currentStep < 5) {
      this.currentStep++;
    }
  }

  // Function to move to the previous step
  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}
