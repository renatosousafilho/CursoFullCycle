import Customer from '../../domain/entity/Customer';
import CustomerRepositoryInterface from '../../domain/repository/CustomerRepositoryInterface';
import CustomerModel from '../db/sequelize/model/CustomerModel';

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zipCode,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }
  
  async update(entity: Customer): Promise<void> {
    await CustomerModel.update({
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zipCode,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    }, {
      where: {
        id: entity.id,
      },
    });
  }
  find(id: string): Promise<Customer> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Customer[]> {
    throw new Error('Method not implemented.');
  }
}