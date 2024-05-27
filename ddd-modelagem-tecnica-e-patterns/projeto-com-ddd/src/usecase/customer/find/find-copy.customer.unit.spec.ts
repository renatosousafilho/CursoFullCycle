import Customer from '../../../domain/customer/entity/Customer';
import Address from '../../../domain/customer/entity/Address';
import FindCustomerUseCase from './find.customer';
import CustomerRepositoryInterface from '../../../domain/customer/repository/CustomerRepositoryInterface';

const customer = new Customer("1", "John Doe");
const address = new Address("Main Street", 123, "Springfield", "IL", "62701");
customer.changeAddress(address);

// const MockCustomerRepository = () => {
//   return {
//     find: jest.fn().mockResolvedValueOnce(customer),
//     findAll: jest.fn(),
//     create: jest.fn(),
//     update: jest.fn(),
//   }
// }

class MockCustomerRepository implements CustomerRepositoryInterface {
  create(entity: Customer): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(entity: Customer): Promise<void> {
    throw new Error('Method not implemented.');
  }
  find(id: string): Promise<Customer> {
    return Promise.resolve(customer);
  }
  findAll(): Promise<Customer[]> {
    throw new Error('Method not implemented.');
  }
  
}

describe('test unit find customer use case', () => {
  

  it('should find a customer', async () => {
    // Arrange
    const customerRepository = new MockCustomerRepository();
    const useCase = new FindCustomerUseCase(customerRepository);
    const input = { id: "1" };

    // Act
    const output = await useCase.execute(input);

    // Assert
    expect(output).toStrictEqual({
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        state: customer.address.state,
        zip: customer.address.zipCode,
      }
    });
  })
});