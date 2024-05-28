import Customer from '../../domain/customer/entity/Customer';
import CustomerRepositoryInterface from '../../domain/customer/repository/CustomerRepositoryInterface';

interface Input {

}

interface Output {
  customers: {
    id: string;
    name: string;
    address: {
      street: string;
      number: number;
      city: string;
      state: string;
      zip: string;
    }
  }[]
}

export default class ListCustomersUseCase {
  private repository: CustomerRepositoryInterface;

  constructor(repository: CustomerRepositoryInterface) {
    this.repository = repository;
  }

  async execute(input: Input): Promise<Output> {
    const customers = await this.repository.findAll();

    return {
      customers: customers.map(customer => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          city: customer.address.city,
          state: customer.address.state,
          zip: customer.address.zipCode
        }
      }))
    };
  }
}
