import CustomerRepositoryInterface from '../../../domain/customer/repository/CustomerRepositoryInterface';
import { InputCustomerDto, OutputCustomerDto } from './find.customer.dto';

export default class FindCustomerUseCase {
  private repository: CustomerRepositoryInterface

  constructor(repository: CustomerRepositoryInterface) {
    this.repository = repository;
  }

  async execute(input: InputCustomerDto): Promise<OutputCustomerDto> {
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