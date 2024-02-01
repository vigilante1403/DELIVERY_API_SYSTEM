import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ICountry,
  IDistrict2,
  IWard2,
} from 'src/app/interface/delivery/IDelivery';
import { MapService } from 'src/app/service/map.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  countries: ICountry[] = [];
  backupCoutries: ICountry[] = [];
  districts: IDistrict2[] = [];
  wards: IWard2[] = [];
  backupDistricts: IDistrict2[] = [];
  backupWards: IWard2[] = [];
  selectedState: string = '';
  selectedSpecila: string = '';
  selectedCoutries: string = '';
  selectedDistrict: string = '';
  selected: boolean = false;
  selected2 = false;
  keyword: string = '';
  constructor(private mapService: MapService) {}
  ngOnInit(): void {
    this.getAllCountries();
  }
  getAllCountries() {
    this.mapService.fetchAllCountries().subscribe({
      next: (res) => {
        this.countries = res;
        this.backupCoutries = [...res];
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.mapService.fetchAllDistricts2().subscribe({
      next: (res) => {
        this.districts = res;
        this.backupDistricts = [...res];
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.mapService.fetchAllWards2().subscribe({
      next: (res) => {
        this.wards = res;
        this.backupWards = [...res];
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getStateChoose(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedState = val;
  }
  getCityChoose(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedSpecila = val;
  }
  getDistrictChoose(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedDistrict = val;
  }
  getCountryChoose(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedCoutries = val;
  }
 
 
  sortCoutriesName() {
    if (this.selected == true) {
      this.countries.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.countries.sort((a, b) => b.name.localeCompare(a.name));
    }
  }
  onSortDisplayname() {
    this.selected = !this.selected;
    this.sortCoutriesName();
  }
  receiveKeyword(event: Event) {
    let target = event.target as HTMLInputElement;
    this.keyword = target.value;
  }
  searchButton() {
    var temp = this.backupCoutries;

    if (this.selectedState != '-1' && this.selectedState != '') {
      temp = temp.filter((x) => x.state === Number(this.selectedState));
    }
    console.log(this.selectedSpecila);

    if (this.selectedSpecila != '-1' && this.selectedSpecila != '') {
      temp = temp.filter((x) =>
        String(x.specila).includes(this.selectedSpecila)
      );
    }
    if (this.keyword != '') {
      temp = temp.filter((x) => x.name.includes(this.keyword));
    }

    this.countries = temp;
  }
  receiveKeyword2(event: Event) {
    let target = event.target as HTMLInputElement;
    this.keyword = target.value;
  }
  searchButton2() {
    var temp = this.backupDistricts;

    if (this.selectedCoutries != '-1' && this.selectedCoutries != '') {
      temp = temp.filter((x) => x.allPlacesInCountryName.includes(this.selectedCoutries));
    }
   
    if (this.keyword != '') {
      temp = temp.filter((x) => x.name.includes(this.keyword));
    }

    this.districts = temp;
  }
  receiveKeyword3(event: Event) {
    let target = event.target as HTMLInputElement;
    this.keyword = target.value;
  }
  searchButton3() {
    var temp = this.backupWards;

    if (this.selectedDistrict != '-1' && this.selectedDistrict != '') {
      temp = temp.filter((x) => x.districtName.includes(this.selectedDistrict));
    }
   

    if (this.keyword != '') {
      temp = temp.filter((x) => x.name.includes(this.keyword)|| x.zipCode?.toString().includes(this.keyword));
    }

    this.wards = temp;
  }
  @ViewChild('search') search!: ElementRef;

  refreshButton() {
    this.countries = this.backupCoutries;
    this.search.nativeElement.value = '';
  }
  @ViewChild('search2') search2!: ElementRef;

  refreshButton2() {
    this.districts = this.backupDistricts;
    this.search2.nativeElement.value = '';
  }
  @ViewChild('search3') search3!: ElementRef;

  refreshButton3() {
    this.wards = this.backupWards;
    this.search3.nativeElement.value = '';
  }
}
