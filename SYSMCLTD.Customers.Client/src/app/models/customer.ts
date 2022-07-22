export class BaseModel{
    id: number;
    isDeleted: boolean;
    constructor(id: number, isDeleted: boolean){
        this.id = id;
        this.isDeleted = isDeleted;
      }
} 


export class Address extends BaseModel{ 
  city: string;
  street: string;
  customerId: number;
  constructor(id: number, isDeleted: boolean, city: string, street: string, customerId:number){
    super(id,isDeleted);
    this.city = city;
    this.street = street;
    this.customerId= customerId;
  }
}

export class Contact extends BaseModel {
    fullName: string;
    officeNumber?: number;
    email?: string;
    customerId:number;

    constructor(id: number, isDeleted: boolean, fullName: string, customerId:number,officeNumber?: number, email?:string){
      super(id,isDeleted);
      this.fullName = fullName;
      this.officeNumber = officeNumber;
      this.email= email;
      this.customerId = customerId;
    }
}

export class Customer extends BaseModel{
    name:string;
    customerNumber: number;
    addresses?:Array<Address>;
    contacts?: Array<Contact>;

    constructor(id: number, isDeleted: boolean, name: string,customerNumber: number){
        super(id,isDeleted);
        this.name = name;
        this.customerNumber = customerNumber;
    }
  }