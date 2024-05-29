import CustomerYupValidator from './CustomerYupValidator';
import Customer from '../../../domain/customer/entity/Customer';
import Address from '../../../domain/customer/entity/value-object/Address';

describe.only('CustomerYupValidator', () => {
  it('when validateCreateCustomer is called with a valid customer, then it should return null', async () => {
    const customerYupValidator = new CustomerYupValidator();
    const customer = new Customer("1", "John Doe");
    const address = new Address("Main Street", 123, "Springfield", "IL", "62701");
    customer.changeAddress(address);

    await customerYupValidator.validateCreateCustomer(customer);

    expect(customer.notification.hasErrors()).toBeFalsy();
  });

  it('when validateCreateCustomer is called with an invalid value to id, then it should return an error', async () => {
    expect(() => {
      const customerYupValidator = new CustomerYupValidator();
      const customer = new Customer("", "John Doe");
      const address = new Address("Main Street", 123, "Springfield", "IL", "62701");
      customer.changeAddress(address);
      customerYupValidator.validateCreateCustomer(customer)
      expect(customer.notification.hasErrors()).toBeTruthy();
      expect(customer.notification.errors.length).toBe(1);
      expect(customer.notification.messages('customer')).toBe('customer: ID is required');
    }).toThrowError('customer: ID is required');
  });

  it('when validateCreateCustomer is called with an invalid value to name, then it should return an error', async () => {
    expect(() => {
      const customerYupValidator = new CustomerYupValidator();
      const customer = new Customer("1", "");
      const address = new Address("Main Street", 123, "Springfield", "IL", "62701");
      customer.changeAddress(address);

      customerYupValidator.validateCreateCustomer(customer);

      expect(customer.notification.errors.length).toBe(1);
      expect(customer.notification.hasErrors()).toBeTruthy();
      expect(customer.notification.messages('customer')).toBe('customer: Name is required');
    }).toThrowError('customer: Name is required');
  });

  it('when validateCreateCustomer is called with an invalid values to id and name, then it should return two errors', async () => {
    expect(() => {
      const customerYupValidator = new CustomerYupValidator();
      const customer = new Customer("", "");

      customerYupValidator.validateCreateCustomer(customer);

      expect(customer.notification.hasErrors()).toBeTruthy();
      expect(customer.notification.errors.length).toBe(2);
      expect(customer.notification.messages('customer')).toBe('customer: ID is required,customer: Name is required');
    }).toThrowError('customer: ID is required,customer: Name is required');
  });
});