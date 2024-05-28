import Customer from '../../domain/customer/entity/Customer';
import Address from '../../domain/customer/entity/value-object/Address';
import CustomerRepositoryInterface from '../../domain/customer/repository/CustomerRepositoryInterface';
import UpdateCustomerUseCase from './UpdateCustomerUseCase';

describe('UpdateCustomerUseCase', () => {
  it('should update a customer', async () => {
    // Arrange
    const customer = new Customer("1", "John Doe",);
    const address = new Address("Main Street", 123, "Springfield", "IL", "62701");
    customer.changeAddress(address);
    const customerRepository = new class implements CustomerRepositoryInterface {
      create(entity: Customer): Promise<void> {
        throw new Error('Method not implemented.');
      }
      update(entity: Customer): Promise<void> {
        return Promise.resolve();
      }
      find(id: string): Promise<Customer> {
        return Promise.resolve(customer);
      }
      findAll(): Promise<Customer[]> {
        throw new Error('Method not implemented.');
      }
    };
    const useCase = new UpdateCustomerUseCase(customerRepository);
    const input = {
      id: "1",
      name: "John Doe",
      address: {
        street: "Av. Paulista",
        number: 1000,
        city: "São Paulo",
        state: "SP",
        zip: "01310-100",
      }
    };

    // Act
    const output = await useCase.execute(input);

    // Assert
    expect(output).toStrictEqual({
      id: "1",
      name: "John Doe",
      address: {
        street: "Av. Paulista",
        number: 1000,
        city: "São Paulo",
        state: "SP",
        zip: "01310-100",
      }
    });
  });
});