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
    deliveryAgentId?:number
}
export interface ISubmitParcel{
    id:number,
    parcelName:string,
    weight:number,
    image:File
}
export interface ISubmitListParcel{
    list:ISubmitParcel[],
    orderId:number,
    customerId:string
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
    imageUrl:string
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
    districtId:number
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