import { Sequelize } from "sequelize-typescript";
import Customer from '../../domain/entity/Customer';
import Address from '../../domain/entity/Address';
import CustomerRepository from './CustomerRepository';
import CustomerModel from '../db/sequelize/model/CustomerModel';

describe("CustomerRepository", () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);

    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    // Arrange
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John Doe");
    const address = new Address("Main Street", 123, "Springfield", "IL", "62701");
    customer.changeAddress(address);

    // Act
    await customerRepository.create(customer);

    // Assert
    const createdCustomer = await CustomerModel.findOne({ where: { id: "1" } });
    expect(createdCustomer.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      city: customer.address.city,
      zipcode: customer.address.zipCode,
    });
  });

  it("should update a customer", async () => {
    // Arrange
    const customerRepository = new CustomerRepository();
    const customer = new Customer("2", "Jane Doe");
    const address = new Address("Main Street", 123, "Springfield", "IL", "62701");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    // Act
    customer.changeName("Jane Smith");
    await customerRepository.update(customer);

    // Assert
    const updatedCustomer = await CustomerModel.findOne({ where: { id: "2" }});
    expect(updatedCustomer.toJSON()).toStrictEqual({
      id: "2",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      city: customer.address.city,
      zipcode: customer.address.zipCode,
    });
  });
});