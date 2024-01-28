import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ICountry, IDeliveryAgent, IDistrict, IOrderShow, ISubmitAddress, IWard } from 'src/app/interface/delivery/IDelivery';
import { DeliveryService } from 'src/app/service/delivery.service';
import { MapService } from 'src/app/service/map.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
  storedCountries:ICountry[]=[]
  storedDistricts:IDistrict[]=[]
  storedWards:IWard[]=[]
  tempDistrict:IDistrict[]=[]
  tempWard:IWard[]=[]
  tempDistrict2:IDistrict[]=[]
  tempWard2:IWard[]=[]
  selectedCountry:number=-1;
  selectedDistrict:number=-1;
  selectedWard:number=-1;
  selectedCountry2:number=-1;
  selectedDistrict2:number=-1;
  selectedWard2:number=-1;
  addressForm!:FormGroup
  flag:boolean=false;
  storedExpress:IDeliveryAgent[]=[]
  chooseDelivery:string=''
  chooseDeliveryId:number=0;
  change:boolean=false;
  storedOrder:IOrderShow=({
    id:0,
    contactAddress:'',
    senderInfo:'',
    service:'',
    customerId:'',
    prePaid:0,
    orderDate:new Date(),
    orderStatus:'',
    orderPaymentId:0,
    deliveryAgentId:0,
    pricePerDistanceId:0
  })
  @Input() orderIdMain!:string
  @Input() customerIdMain!:string
  @Output() dataToParent=new EventEmitter<boolean>
  private readonly notifier : NotifierService;
  sendData(){
    this.dataToParent.emit(true)
  }
  minDate:string=''
  contactOldData:string=localStorage.getItem('contact-old-data')!=null?localStorage.getItem('contact-old-data')!:''
  senderOldData:string=localStorage.getItem('sender-old-data')!=null?localStorage.getItem('sender-old-data')!:''
  constructor(private datepipe:DatePipe,private fb:FormBuilder,private service:MapService,private routeActivate:ActivatedRoute,private deliveryService:DeliveryService,private router:Router, private _notifier: NotifierService) { 
    var contactData = this.router.getCurrentNavigation()?.extras.state?.['data']['contact']
    var senderData = this.router.getCurrentNavigation()?.extras.state?.['data']['sender']
    console.log(contactData)
    console.log(senderData)
    if(contactData!=undefined){
      localStorage.setItem('contact-old-data',contactData)
      this.contactOldData=contactData
    }
    if(senderData!=undefined){
      localStorage.setItem('sender-old-data',senderData)
      this.senderOldData=senderData
    }
    const currentDate = new Date()
    this.minDate=this.datepipe.transform(currentDate, 'yyyy-MM-dd')!;
    this.notifier=_notifier;
  }
 initForm(){
  this.addressForm=this.fb.group({
    name1:['',Validators.required],
    name2:['',Validators.required],
    address1:['',Validators.required],
    address2:['',Validators.required],
    phone1:['',Validators.required],
    phone2:['',Validators.required],
    date:[new Date(),Validators.required]
  })
 }
 getListDistrict(event:Event){
  this.tempDistrict=[]
  this.tempWard=[]
  const id = (event.target as HTMLSelectElement).value
  this.selectedCountry=Number(id);
  this.tempDistrict=this.storedDistricts
  this.tempDistrict=this.tempDistrict.filter(e=>e.allPlacesInCountryId==Number(id))
  
 }
 validateInfo(){
  this.flag=true;
  const nameRegex = /^[a-zA-Z\s]*$/;
  const phoneRegex = /^\d{10}$/;

  if(!nameRegex.test(this.addressForm.get('name1')?.value)||!nameRegex.test(this.addressForm.get('name2')?.value)){
    this.flag=false;
  }
  if(!phoneRegex.test(this.addressForm.get('phone1')?.value)||!phoneRegex.test(this.addressForm.get('phone2')?.value)){
    this.flag=false;
  }

  return this.flag
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
 getListDistrict2(event:Event){
  this.tempDistrict2=[]
  this.tempWard2=[]
  const id = (event.target as HTMLSelectElement).value
  this.selectedCountry2=Number(id);
  this.tempDistrict2=this.storedDistricts
  this.tempDistrict2=this.tempDistrict2.filter(e=>e.allPlacesInCountryId==Number(id))
  
 }
 getListWard2(event:Event){
  this.tempWard2=[]
  const id = (event.target as HTMLSelectElement).value
  this.selectedDistrict2=Number(id);
  this.tempWard2=this.storedWards
  this.tempWard2=this.tempWard2.filter(e=>e.districtId==Number(id))
 }
 getChosenWard2(event:Event){
  const id = (event.target as HTMLSelectElement).value
  this.selectedWard2=Number(id);
 }
    ngOnInit() {

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
        this.service.fetchAllExpress().subscribe({
          next:(res)=>{console.log(res);this.storedExpress=res},
          error:(err)=>{console.log(err)}
        })
        var orderId=Number(this.orderIdMain)
        var customerId=this.customerIdMain
        this.deliveryService.checkout(customerId,orderId).subscribe({
          next:(res)=>{console.log(res);this.storedOrder=res;this.defaultChooseDelivery()},
          error:(err)=>{console.log(err)}
        })
    }
    defaultChooseDelivery(){
      var agentId = this.storedOrder.deliveryAgentId!;
      this.chooseDeliveryId=agentId
      var temp = this.storedExpress
      this.chooseDelivery = temp.filter(d=>d.id==agentId)[0].agentName
    }
    changeDelivery(){
      this.change=true;
    }
    getAgentChanged(event:Event){
      const id =Number((event.target as HTMLSelectElement).value) 
      var temp = this.storedExpress
      this.chooseDeliveryId=id
      this.chooseDelivery=temp.filter(d=>d.id==id)[0].agentName
      
    }
    onSubmit(){
      if(this.addressForm.invalid){
        this.notifier.show({
          type: 'error',
          message: 'Form invalid, please check again!',
          id: 'THAT_NOTIFICATION_ID',
        });
        setTimeout(()=>{
          this.notifier.hide('THAT_NOTIFICATION_ID');
        },2000)
        return;
      }else{
        // if(!this.validateInfo()){
        //   console.log("Address or phone number invalid")
        //   return;
        // }
       
          var submitAddress=({
            LocationStartPlaceId:this.selectedCountry,
            LocationEndPlaceId:this.selectedCountry2,
            LocationStartDistrictId:this.selectedDistrict,
            LocationEndDistrictId:this.selectedDistrict2,
            LocationStartWardId:this.selectedWard,
            LocationEndWardId:this.selectedWard2,
            LocationStartStreet:this.addressForm.get('address1')?.value,
            LocationEndStreet:this.addressForm.get('address2')?.value,
            ContactName:this.addressForm.get('name2')?.value,
            ContactPhoneNumber:this.addressForm.get('phone2')?.value,
            SenderName:this.addressForm.get('name1')?.value,
            SenderPhoneNumber:this.addressForm.get('phone1')?.value,
            DeliveryAgentId:this.chooseDeliveryId
          })
          this.filterZipCodeStart(this.selectedWard);
          this.filterZipCodeEnd(this.selectedWard2)
          var orderId = this.routeActivate.snapshot.paramMap.get('orderId')
          var submit=({
            OrderId:Number(orderId),
            SubmitAddressNew:submitAddress,
            NewPickUpTime:this.addressForm.get('date')?.value
          })
          var submit1 = JSON.stringify(submit)
          const formData = new FormData()
          formData.append('submit1',submit1)
          console.log("submit1",submit1)
          this.service.updatePaidOrder(formData).subscribe({
            next:(res)=>{console.log(res);this.updateDelivery()
              this.notifier.show({
                type: 'success',
                message: 'Update paid order success!',
                id: 'THAT_NOTIFICATION_ID',
              });
              setTimeout(()=>{
                this.notifier.hide('THAT_NOTIFICATION_ID');
              },2000)
            },
            error:(err)=>{console.log(err)
              this.notifier.show({
                type: 'error',
                message: 'An error occurred, please check again!',
                id: 'THAT_NOTIFICATION_ID',
              });
              setTimeout(()=>{
                this.notifier.hide('THAT_NOTIFICATION_ID');
              },2000)
            }
          })
        
      }
    }
    updateDelivery(){
      var submitNext=({
        OrderId:Number(this.routeActivate.snapshot.paramMap.get('orderId')),
        ZipCodeStart:Number(localStorage.getItem('wardStart')!),
        ZipCodeEnd:Number(localStorage.getItem('wardEnd')!)
      })
      const form = new FormData()
      
      var delivery1 = JSON.stringify(submitNext)
      form.append('delivery1',delivery1)
      this.service.updateDelivery(form).subscribe({
        next:(res)=>{console.log("Success")
        this.notifier.show({
          type: 'success',
          message: 'Update Delivery success!',
          id: 'THAT_NOTIFICATION_ID',
        });
        setTimeout(()=>{
          this.notifier.hide('THAT_NOTIFICATION_ID');
        },2000)

        },
        error:(err)=>{console.log(err)
          this.notifier.show({
            type: 'error',
            message: 'An error occurred, please check again!',
            id: 'THAT_NOTIFICATION_ID',
          });
          setTimeout(()=>{
            this.notifier.hide('THAT_NOTIFICATION_ID');
          },2000)
        }
      })
    }
    filterZipCodeStart(wardStart:number){
      var temp = this.storedWards;
      if(wardStart==-1){
        localStorage.setItem('wardStart','-1')
      }else{
        var zipCodeStart = temp.filter(x=>x.id==wardStart)[0].zipCode!;
      localStorage.setItem('wardStart',zipCodeStart?.toString());
      }
      
    }
    filterZipCodeEnd(wardEnd:number){
      var temp = this.storedWards;
      if(wardEnd==-1){
        localStorage.setItem('wardEnd','-1')
      }else{
        var zipCodeEnd = temp.filter(x=>x.id==wardEnd)[0].zipCode!;
      localStorage.setItem('wardEnd',zipCodeEnd?.toString());
      }
      
    }
}
