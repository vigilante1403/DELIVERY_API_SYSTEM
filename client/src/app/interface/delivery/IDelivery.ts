export interface IService{
    id:number,
    serviceName:string,
    price:number,
    prePaid:boolean,
    collect:boolean,
    daysAdd:number,
}
export interface ISubmitOrder{
    contactAddress:string,
    serviceId:number,
    customerId:string,
    prePaid:number,
    orderDate:Date
}
export interface IOrderShow{
    id:number,
    contactAddress:string,
    service:string,
    customerId:string,
    prePaid:number,
    orderDate:Date,
    orderStatus:string,
    orderPaymentId?:number
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
    id:string,
    startAddress:string,
    endAddress:string
}