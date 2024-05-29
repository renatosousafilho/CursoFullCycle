import Address from './value-object/Address';
import Customer from './Customer';
import CustomerYupValidator from '../../../infrastructure/customer/validator/CustomerYupValidator';
import CustomerJoiValidator from '../../../infrastructure/customer/validator/CustomerJoiValidator';

describe("Customer", () => {
  it.only("should thrown an error if the name is empty", () => {
    // const validator = new CustomerYupValidator();
    const validator = new CustomerJoiValidator();
    expect(() => new Customer("1", "", validator)).toThrowError("customer: Name is required");
  });

  it("should thrown an error if the id is empty", () => {
    // const validator = new CustomerYupValidator();
    const validator = new CustomerJoiValidator();
    expect(() => {new Customer("", "John Doe", validator)}).toThrowError("customer: ID is required");
  });

  it("should thrown an error if the id is empty and the name is empty", () => {
    // const validator = new CustomerYupValidator();
    const validator = new CustomerJoiValidator();
    expect(() => new Customer("", "", validator)).toThrowError("customer: ID is required,customer: Name is required");
  });

  it("should change the name", () => {
    const customer = new Customer("1", "John Doe");
    customer.changeName("Jane Doe");
    expect(customer.name).toBe("Jane Doe");
  });

  it('should activate the customer', () => {
    const customer = new Customer('1', 'John Doe');
    const address = new Address('Main Street', 123, 'Springfield', 'IL', '12345678');
    customer.changeAddress(address);
    customer.activate();
    expect(customer.isActive()).toBeTruthy();
  });

  it('should deactivate the customer', () => {
    const customer = new Customer('1', 'John Doe');
    const address = new Address('Main Street', 123, 'Springfield', 'IL', '12345678');
    customer.changeAddress(address);
    customer.activate();
    customer.deactivate();
    expect(customer.isActive()).toBeFalsy();
  });

  it('should thrown an error when activating a customer without address', () => {
    const customer = new Customer('1', 'John Doe');
    expect(() => customer.activate()).toThrowError('Address is mandatory to activate the customer');
  });

  it('should add reward points', () => {
    const customer = new Customer('1', 'John Doe');
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(100);
    expect(customer.rewardPoints).toBe(100);
    customer.addRewardPoints(50);
    expect(customer.rewardPoints).toBe(150);
  });
});