import Address from '../../../../domain/customer/entity/Address';
import Customer from '../../../../domain/customer/entity/Customer';
import CustomerRepositoryInterface from '../../../../domain/customer/repository/CustomerRepositoryInterface';
import CustomerModel from './CustomerModel';

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    try {
      await CustomerModel.create({
        id: entity.id,
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipcode: entity.address.zipCode,
        city: entity.address.city,
        state: entity.address.state,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      });
    } catch (e: any) {
      // console.log(entity);
      console.log(e.stack);
    }
  }
  
  async update(entity: Customer): Promise<void> {
    await CustomerModel.update({
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zipCode,
      city: entity.address.city,
      state: entity.address.state,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    }, {
      where: {
        id: entity.id,
      },
    });
  }

  async find(id: string): Promise<Customer> {
    const customerModel = await CustomerModel.findOne({ where: { id } });
    if (!customerModel) {
      throw new Error('Customer not found');
    }

    const customer = new Customer(customerModel.id, customerModel.name);
    const address = new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.state, customerModel.zipcode);
    customer.changeAddress(address);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    const customers = customerModels.map((customerModel) => {
      let customer = new Customer(customerModel.id, customerModel.name);
      customer.addRewardPoints(customerModel.rewardPoints);
      const address = new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.state, customerModel.zipcode);
      customer.changeAddress(address);
      if (customerModel.active) {
        customer.activate();
      }
      return customer;
    });

    return customers;
  }
}