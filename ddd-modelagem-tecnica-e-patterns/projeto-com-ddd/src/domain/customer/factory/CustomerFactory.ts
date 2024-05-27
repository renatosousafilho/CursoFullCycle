import { v4 as uuid } from 'uuid';
import Customer from '../entity/Customer';
import Address from '../entity/value-object/Address';

export default class CustomerFactory {
  static create(name: string) {
    const id = uuid();
    return new Customer(id, name);
  }

  static createWithAddress(name: string, address: Address) {
    const id = uuid();
    const customer = new Customer(id, name);
    customer.changeAddress(address);
    return customer;
  }
}