import { Sequelize } from "sequelize-typescript";
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/CustomerModel';
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/CustomerRepository';
import Customer from '../../../domain/customer/entity/Customer';
import Address from '../../../domain/customer/entity/value-object/Address';
import FindCustomerUseCase from './find.customer';

describe('test find customer use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a customer', async () => {
    // Arrange
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John Doe");
    const address = new Address("Main Street", 123, "Springfield", "IL", "62701");
    customer.changeAddress(address);
    await customerRepository.create(customer);
    const input = { id: "1" };

    // Act
    const useCase = new FindCustomerUseCase(customerRepository);
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