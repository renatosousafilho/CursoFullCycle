import Address from '../../domain/customer/entity/value-object/Address';
import Customer from '../../domain/customer/entity/Customer';
import CustomerFactory from '../../domain/customer/factory/CustomerFactory';
import CustomerRepositoryInterface from '../../domain/customer/repository/CustomerRepositoryInterface';

interface Input {
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    state: string;
    zip: string;
  }
}

export interface Output {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    state: string;
    zip: string;
  }
}

export default class CreateCustomerUseCase {
  private repository: CustomerRepositoryInterface

  constructor(repository: CustomerRepositoryInterface) {
    this.repository = repository;
  }

  async execute(input: Input): Promise<Output> {
    const address = new Address(input.address.street, input.address.number, input.address.city, input.address.state, input.address.zip);
    const customer = CustomerFactory.createWithAddress(input.name, address);

    await this.repository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        state: customer.address.state,
        zip: customer.address.zipCode,
      }
    };
  }
}