import Customer from '../../../domain/customer/entity/Customer';
import CustomerRepositoryInterface from '../../../domain/customer/repository/CustomerRepositoryInterface';
import CreateCustomerUseCase from './create.customer';

describe('CreateCustomerUseCase', () => {
  let customerRepository: CustomerRepositoryInterface;

  beforeAll(() => {
    customerRepository = new class implements CustomerRepositoryInterface {
      create(entity: Customer): Promise<void> {
        return Promise.resolve();
      }
      update(entity: Customer): Promise<void> {
        throw new Error('Method not implemented.');
      }
      find(id: string): Promise<Customer> {
        throw new Error('Method not implemented.');
      }
      findAll(): Promise<Customer[]> {
        throw new Error('Method not implemented.');
      }
    }
  });

  it('should create a customer', async () => {
    // Arrange
    const useCase = new CreateCustomerUseCase(customerRepository);
    const input = {
      name: "John Doe",
      address: {
        street: "Main Street",
        number: 123,
        city: "Springfield",
        state: "IL",
        zip: "62701",
      }
    };

    // Act
    const output = await useCase.execute(input);

    // Assert
    expect(output).toStrictEqual({
      id: expect.any(String),
      name: "John Doe",
      address: {
        street: "Main Street",
        number: 123,
        city: "Springfield",
        state: "IL",
        zip: "62701",
      }
    });
  });

  it('should throw an error when name is not provided', async () => {
    // Arrange
    const useCase = new CreateCustomerUseCase(customerRepository);
    const input = {
      name: "",
      address: {
        street: "Main Street",
        number: 123,
        city: "Springfield",
        state: "IL",
        zip: "62701",
      }
    };

    // Act and Assert
    await expect(useCase.execute(input)).rejects.toThrow('Name is required');
  });

  it('should throw an error when street of address is not provided', async () => {
    // Arrange
    const useCase = new CreateCustomerUseCase(customerRepository);
    const input = {
      name: "John Doe",
      address: {
        street: "",
        number: 123,
        city: "Springfield",
        state: "IL",
        zip: "62701",
      }
    };

    // Act and Assert
    await expect(useCase.execute(input)).rejects.toThrow('Street is required');
  });
});