export interface IUser{
    displayName:string,
    email:string,
    token:string,
    imageUrl:string,
    userId?:string,
    totalDeliveriesMade?:string,
    role?:string,
    phoneNumber?:string
}
export interface ILogin{
    email:string,
    password:string
}
export interface IRegister{
    displayName:string,
    email:string,
    password:string
}
export interface ICustomer{
    id:string,
    name:string,
    email:string,
    phoneNumber:string
}