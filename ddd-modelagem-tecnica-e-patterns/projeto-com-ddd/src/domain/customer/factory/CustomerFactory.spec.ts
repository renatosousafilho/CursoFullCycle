import Address from '../entity/Address';
import CustomerFactory from './CustomerFactory';

describe('Customer factory unit tests', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('Customer 1');

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('Customer 1');
    expect(customer.constructor.name).toBe('Customer');

  });

  it('should create a customer with address', () => {
    const address = new Address('a1', 123, 'Main St', 'Springfield', 'USA');
    const customer = CustomerFactory.createWithAddress('Customer 1', address);

    expect(customer.id).toBeDefined();
    expect(customer.constructor.name).toBe('Customer');
    expect(customer.address).toBe(address);
  });
});


