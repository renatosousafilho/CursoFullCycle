export interface InputCustomerDto {
  id: string;
}

export interface OutputCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zip: string;
  }
}