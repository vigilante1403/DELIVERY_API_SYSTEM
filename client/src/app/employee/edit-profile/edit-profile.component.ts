
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { ICountry, IDistrict, IWard } from 'src/app/interface/delivery/IDelivery';

import { ModalService } from 'src/app/nav-bar/modal/modal.service';
import { MapService } from 'src/app/service/map.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit{
  editProfileForm!: FormGroup;
  userEmail= localStorage.getItem('userEmail');
  imageUrl= localStorage.getItem('imageUrl');
  name=''
  storedCountries:ICountry[]=[]
  storedDistricts:IDistrict[]=[]
  storedWards:IWard[]=[]
  tempDistrict:IDistrict[]=[]
  tempWard:IWard[]=[]
  selectedCountry:number=0;
  selectedDistrict:number=0;
  selectedWard:number=0;
  streetCombine=''
  zipcode=''
  constructor(private fb: FormBuilder,private service:MapService,private modalService:ModalService,private router:Router){}
  ngOnInit(): void {
    this.initForm()
    this.service.fetchAllCountries().subscribe({
      next:(res)=>{console.log(res);this.storedCountries=res;},
      error:(err)=>{console.log(err)}
    })
    this.service.fetchAllDistricts().subscribe({
      next:(res)=>{console.log(res);this.storedDistricts=res},
      error:(err)=>{console.log(err)}
    })
    this.service.fetchAllWards().subscribe({
      next:(res)=>{console.log(res);this.storedWards=res},
      error:(err)=>{console.log(err)}
    })
  }
  initForm(){
    this.editProfileForm = this.fb.group({
      DisplayName: ['', Validators.required],
      Email: [this.userEmail, Validators.required],
      // ImageUrl: [this.imageUrl, Validators.required],
      ImageUrl: [null,Validators.required],
      FirstName:['',Validators.required],
      LastName:['',Validators.required],
      PhoneNumber:['',Validators.required],
      BackupEmail:[''],
      Street:['',Validators.required]
    })
  }
  updateName(event:Event){
    var name = (event.target as HTMLInputElement).value
    this.editProfileForm.patchValue({DisplayName:name})
    this.name=name
  }
   emailValidator(value:any) {
    // Define the email pattern using a regular expression
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    // Test the control value against the pattern
    const isValid = emailPattern.test(value);
  
    // If the value does not match the pattern, return an error
    return isValid ? true : false;
  }
  flag=false;
  validateInfo(){
    this.flag=true;
    const nameRegex = /^[a-zA-Z\s]*$/;
    const phoneRegex = /^\d{10}$/;
  
    if(!nameRegex.test(this.editProfileForm.get('DisplayName')?.value)||!nameRegex.test(this.editProfileForm.get('FirstName')?.value)||!nameRegex.test(this.editProfileForm.get('LastName')?.value)){
      this.flag=false;
    }
    if(!phoneRegex.test(this.editProfileForm.get('PhoneNumber')?.value)){
      this.flag=false;
    }
  
    return this.flag
   }
   streetCombineMethod(){
    var temp1 = this.storedCountries
    var city = temp1.filter(x=>x.id==this.selectedCountry)[0]
    var special = city.specila?"City":"Province"
    var cityName = city.name
    var temp2 = this.storedDistricts
    var districtName = temp2.filter(x=>x.id==this.selectedDistrict)[0].name
    var temp3 = this.storedWards
    var ward = temp3.filter(f=>f.id==this.selectedWard)[0]
    var wardName = ward.name
    var zipcode = ward.zipCode!.toString()
    this.zipcode=zipcode
    var street = this.editProfileForm.get('Street')?.value
    
    var result = street.trim() + " Street, "+wardName+" Ward, "+districtName+" District, "+cityName+" "+special
  console.log(result) 
  return result
  }
  onFileSelected(event:any) {


    const file:File = event.target?.files[0]

    if (file) {
        this.editProfileForm.patchValue({ImageUrl:file})
        console.log(event.target.files[0])
        
    }
}
getListDistrict(event:Event){
  this.tempDistrict=[]
  this.tempWard=[]
  const id = (event.target as HTMLSelectElement).value
  this.selectedCountry=Number(id);
  this.tempDistrict=this.storedDistricts
  this.tempDistrict=this.tempDistrict.filter(e=>e.allPlacesInCountryId==Number(id))
  
 }
 getListWard(event:Event){
  this.tempWard=[]
  const id = (event.target as HTMLSelectElement).value
  this.selectedDistrict=Number(id)
  this.tempWard=this.storedWards
  this.tempWard=this.tempWard.filter(e=>e.districtId==Number(id))
 }
 getChosenWard(event:Event){
  const id = (event.target as HTMLSelectElement).value
  this.selectedWard=Number(id);
 }
  onSubmit(){
    
    if(this.editProfileForm.valid){
      if(this.validateInfo()){
        var street = this.streetCombineMethod()
        const formData = new FormData()
        if(this.editProfileForm.get('BackupEmail')?.value!=""){
        var check=  this.emailValidator(this.editProfileForm.get('BackupEmail')!.value)
        if(check){
  
          formData.append('BackupEmail',this.editProfileForm.get('BackupEmail')?.value)
        }
        }
        console.log(this.editProfileForm.get('DisplayName'))
      formData.append('DisplayName',this.name)
      formData.append('Email',this.editProfileForm.get('Email')!.value)
      formData.append('ImageUrl',this.editProfileForm.get('ImageUrl')!.value)
      formData.append('FirstName',this.editProfileForm.get('FirstName')?.value)
      formData.append('LastName',this.editProfileForm.get('LastName')?.value)
      formData.append('PhoneNumber',this.editProfileForm.get('PhoneNumber')?.value)
      formData.append('Street',street)
      formData.append('ZipCode',this.zipcode)
      this.service.editProfileBasic(formData).subscribe({
        next:(res)=>{console.log(res);this.modalService.Logout();this.router.navigateByUrl("/")},
        error:(err)=>{console.log(err)}
      })
        
      }
      

     
    }
   
    
  }
}
