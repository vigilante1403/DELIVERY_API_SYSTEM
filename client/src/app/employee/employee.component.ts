import { Component } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  query: string = '';
  searchResults: string[] = [];

  constructor(private searchService: SearchService) {}

  onSubmit(): void {
    this.searchService.search(this.query).subscribe(
      (results) => {
        this.searchResults = results;
      },
      (error) => {
        console.error('Error during search:', error);
      }
    );
  }
}
