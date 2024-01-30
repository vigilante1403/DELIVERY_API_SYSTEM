export interface IService{
    id:number,
    serviceName:string,
    price:number,
    prePaid:boolean,
    collect:boolean,
    daysAdd:number,
}
export interface ISubmitOrder{
    serviceId:number,
    customerId:string,
    prePaid:number,
    orderDate:Date
}
export interface IOrderShow{
    id:number,
    contactAddress:string,
    senderInfo?:string
    service:string,
    customerId:string,
    prePaid:number,
    orderDate:Date,
    orderStatus:string,
    orderPaymentId?:number,
    deliveryAgentId?:number,
    pricePerDistanceId:number
}
export interface ISubmitParcel{
    id:number,
    parcelName:string,
    weight:number,
    image:File,
    quantity:number,
    amountAssume:number
}
export interface ISubmitListParcel{
    list:ISubmitParcel[],
    orderId:number,
    customerId:string,
  
}
export interface ISubmitAddress{
    locationStartPlaceId:number,
    locationEndPlaceId:number,
    locationStartDistrictId:number,
    locationEndDistrictId:number,
    locationStartWardId:number,
    locationEndWardId:number,
    locationStartStreet:string,
    locationEndStreet:string,
    contactName:string,
    contactPhoneNumber:string,
    senderName:string,
    senderPhoneNumber:string,
    deliveryAgentId:number
}
export interface IReturnParcel{
    id:number,
    parcelName:string,
    weight:number,
    imageUrl:string,
    quantity:number
}
export interface IPayment{
    id:number,
    subTotal:number,
    prePaid:number,
    servicePrice:number,
    distanceCharges:number,
    totalCharges:number,
    orderPaymentStatus:string
}
export interface ICountry{
    id:number,
    name:string,
    specila:boolean,
    state:number
}
export interface IDistrict{
    id:number,
    name:string,
    allPlacesInCountryId:number
}
export interface IWard{
    id:number,
    name:string,
    districtId:number,
    zipCode?:number
}
export interface IDeliveryAgent{
    id:number,
    agentName:string,
    vehicleNumber:string,
    agentContactNumber:string,
    startWorkingTime?:string,
    endWorkingTime?:string,
    pickUpTimeInCity?:string
    pickUpTimeInOtherPlace?:string
    pickUpTimeForSpecialOrder?:number,
    dayMayDelay?:number,
    requiredTimeForOrderToPickUp?:string,
    charges?:number,
    maxFreeWeight:number
}
export interface IOrderShow2{
    id:number,
    service:string,
    route:string,
    customerId:string,
    prePaid:number,
    orderDate:Date,
    orderStatus:string,
    orderPaymentStatus:string,
    deliveryAgent:string,
    state?:string
}
export interface IPaymentStatus{
    id:number,
    statusName:string
}
export interface IOrderStatus{
    id:number,
    statusName:string
}
export interface IUser{
    id:string,
    email:string,
    password:string,
    displayName:string,
    roleName:string
}
export interface IDelivery{
    id:number,
    orderId:number,
    deliveryAgentName:string,
    orderPaymentId:number,
    pickUpDateTime:Date,
    deliveryDate:Date,
    deliveryStatusName:string,
    codMoney?: number
}

export interface IDelivering{
    id:number,
    orderId:number,
    route: string,
    deliveryAgentName:string,
    deliveryDate:Date,
    deliveryStatusName:string
}
export interface IReturnPayInfoParcel{
    orderId:number,
    orderDTO:IOrderShow,
    returnParcels:IReturnParcel[],
    returnPayment:IPayment
}
export class Show implements IOrderShow{
    id= 0
    contactAddress= ''
    senderInfo=''
    service=''
    customerId=''
    prePaid=0
    orderDate=new Date()
    orderStatus=''
    orderPaymentId=0
    deliveryAgentId=0
    pricePerDistanceId=0
}
export class Payment implements IPayment{
    id=0
    subTotal=0
    prePaid=0
    servicePrice=0
    distanceCharges=0
    totalCharges=0
    orderPaymentStatus=''
    
}
export class ReturnParcel implements IReturnParcel{
    id=0
    parcelName=''
    weight=0
    imageUrl=''
    quantity=0

    
}
export interface ISubmitChangeLocation{
    orderId:number,
    newZipCodeLocation:number
}

export interface IPricePerDistance{
    id: number;
    route: string;
    pricePerKg:number;
    priceRoute:number;
    priceAdd1Kg: number;
    deliveryTime: number;
}