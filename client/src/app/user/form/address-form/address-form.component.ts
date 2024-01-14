
import { Component, AfterViewInit, ElementRef,NgZone, ViewChild, OnInit } from '@angular/core';
import { MapService } from 'src/app/service/map.service';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { ISubmitAddress } from 'src/app/interface/delivery/IDelivery';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { uuid } from 'uuidv4';



declare var google: any;
@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  // constructor(private service:MapService,private elementRef: ElementRef, private ngZone: NgZone){}
  // @ViewChild('gmapContainer') mapElement!: ElementRef;
  // map: any;
  // geocoder: any;
  // address: string='';
  // ngOnInit(): void {
  //   this.loadGoogleMapsScript(() => {
  //     this.initializeMap();
  //   });
  // }
  loadGoogleMapsScript(callback: () => void) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDDAFrEoBErPc_5B49M-D4nkcApKvl3fnw&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = callback;

    document.head.appendChild(script);
  }
  // initializeMap() {
  //   this.map = new google.maps.Map(this.mapElement.nativeElement, {
  //     center: { lat: 0, lng: 0 },
  //     zoom: 8,
  //   });

  //   this.geocoder = new google.maps.Geocoder();
  // }
  addressForm!:FormGroup
  constructor(private fb:FormBuilder,private service:MapService,private routeActivate:ActivatedRoute) { }
 initForm(){
  this.addressForm=this.fb.group({
    address1:['',Validators.required],
    address2:['',Validators.required]
  })
 }
  // ngOnInit() {
  //   this.loadMap();
  // }

  loadMap() {
    const mapOptions = {
      center: new google.maps.LatLng(-24.356, -24.356),
      zoom: 8
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Example marker for demonstration
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(-24.356, -24.356),
      map: map,
      title: 'Hello World!'
    });
  }
  location!: Location

    ngOnInit() {
        this.location = {
            latitude: -28.68352,
            longitude: -147.20785
        }
        this.initForm()
    }
  // ngAfterViewInit(): void {
  //   this.ngZone.runOutsideAngular(() => {
  //     const mapDiv = this.elementRef.nativeElement.querySelector('#map');
  //     const mapOptions: google.maps.MapOptions = {
  //       center: { lat: 0, lng: 0},
  //       zoom: 8,
  //     };

  //     this.service.createMap(mapDiv, mapOptions);
  //   });
  // }
  onSubmit(){
    if(this.addressForm.valid){
      var submitAddress:ISubmitAddress=({id:uuidv4(),startAddress:this.addressForm.get('address1')?.value,
      endAddress:this.addressForm.get('address2')?.value})
      var orderId = this.routeActivate.snapshot.paramMap.get('orderId')
      this.service.createNewOrderPayment(orderId,submitAddress).subscribe({
        next:(res)=>{console.log(res)},
        error:(err)=>{console.log(err)}
      })
    }
  }
}
interface Location {
  latitude: number;
  longitude: number
}
