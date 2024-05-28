import Customer from '../../domain/customer/entity/Customer';
import Address from '../../domain/customer/entity/value-object/Address';
import CustomerRepositoryInterface from '../../domain/customer/repository/CustomerRepositoryInterface';
import ListCustomersUseCase from './ListCustomersUseCase';


describe('ListCustomersUseCase', () => {
  it('should list customers', async () => {
    // Arrange
    // Cria o cliente 1
    const customer1 = new Customer("1", "John Doe",);
    const address1 = new Address("Av Afonso Pena", 1000, "Belo Horizonte", "MG", "30130-007");
    customer1.changeAddress(address1);
    // Cria o cliente 2
    const customer2 = new Customer("2", "Jane Doe",);
    const address2 = new Address("Av. Paulista", 1000, "São Paulo", "SP", "01310-100");
    customer2.changeAddress(address2);

    // Cria um repositório de clientes mockado
    const customerRepository = new class implements CustomerRepositoryInterface {
      create(entity: Customer): Promise<void> {
        throw new Error('Method not implemented.');
      }
      update(entity: Customer): Promise<void> {
        return Promise.resolve();
      }
      find(id: string): Promise<Customer> {
        throw new Error('Method not implemented.');
      }
      findAll(): Promise<Customer[]> {
        return Promise.resolve([customer1, customer2]);
      }
    };

    // Instancia o caso de uso
    const useCase = new ListCustomersUseCase(customerRepository);

    // Act
    const output = await useCase.execute({});

    // Assert
    expect(output.customers.length).toBe(2);
    expect(output.customers[0]).toStrictEqual({
      id: "1",
      name: "John Doe",
      address: {
        street: "Av Afonso Pena",
        number: 1000,
        city: "Belo Horizonte",
        state: "MG",
        zip: "30130-007",
      }
    });
    expect(output.customers[1]).toStrictEqual({
      id: "2",
      name: "Jane Doe",
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

