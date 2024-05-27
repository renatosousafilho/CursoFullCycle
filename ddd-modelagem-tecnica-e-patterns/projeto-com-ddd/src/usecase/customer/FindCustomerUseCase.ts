import CustomerRepositoryInterface from '../../domain/customer/repository/CustomerRepositoryInterface';
interface Input {
  id: string;
}

interface Output {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  }
}

export default class FindCustomerUseCase {
  private repository: CustomerRepositoryInterface

  constructor(repository: CustomerRepositoryInterface) {
    this.repository = repository;
  }

  async execute(input: Input): Promise<Output> {
    const customer = await this.repository.find(input.id);
  
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        state: customer.address.state,
        zip: customer.address.zipCode,
      }
    };
  }
}