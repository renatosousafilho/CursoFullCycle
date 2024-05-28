import Address from '../../domain/customer/entity/value-object/Address';
import CustomerRepositoryInterface from '../../domain/customer/repository/CustomerRepositoryInterface';

interface Input {
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

interface Output {
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

export default class UpdateCustomerUseCase {
  private repository: CustomerRepositoryInterface

  constructor(repository: CustomerRepositoryInterface) {
    this.repository = repository;
  }

  async execute(input: Input): Promise<Output> {
    const customer = await this.repository.find(input.id);
    customer.changeName(input.name);
    const newAddress = new Address(input.address.street, input.address.number, input.address.city, input.address.state, input.address.zip);
    customer.changeAddress(newAddress);

    await this.repository.update(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        state: customer.address.state,
        zip: customer.address.zipCode
      }
    }
  }
}