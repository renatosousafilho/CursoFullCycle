import { Sequelize } from "sequelize-typescript";
import Customer from '../../../../domain/customer/entity/Customer';
import Address from '../../../../domain/customer/entity/Address';
import CustomerRepository from './CustomerRepository';
import CustomerModel from './CustomerModel';

describe("CustomerRepository", () => {
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
      state: customer.address.state,
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
      state: customer.address.state,
      zipcode: customer.address.zipCode,
    });
  });

  it("should find a customer", async () => {
    // Arrange
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John Doe");
    const address = new Address("Main Street", 123, "Springfield", "IL", "62701");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    // Act
    const foundCustomer = await customerRepository.find("1");

    // Assert
    expect(foundCustomer).toStrictEqual(customer);
  });

  it("should throw an error when customer is not found", async () => {
    // Arrange
    const customerRepository = new CustomerRepository();

    // Act
    // Assert
    await expect(() => customerRepository.find("1")).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    // Arrange
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("1", "John Doe");
    const address1 = new Address("Main Street", 123, "Springfield", "IL", "62701");
    customer1.changeAddress(address1);
    await customerRepository.create(customer1);

    const customer2 = new Customer("2", "Jane Doe");
    const address2 = new Address("Main Street", 123, "Springfield", "IL", "62701");
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    // Act
    const foundCustomers = await customerRepository.findAll();

    // Assert
    expect(foundCustomers).toStrictEqual([customer1, customer2]);
  });
});