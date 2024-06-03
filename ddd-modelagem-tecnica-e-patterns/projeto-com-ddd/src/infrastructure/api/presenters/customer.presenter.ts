import { toXML } from 'jstoxml';

import { ListCustomersUseCaseOutput } from '../../../usecase/customer/ListCustomersUseCase';
import { allow } from 'joi';

export default class CustomerPresenter {
  public static toXML(data: ListCustomersUseCaseOutput): string {
    const xmlOptions = {
      header: true,
      indent: '  ',
      newline: '\n',
      allowEmpty: true,
    };

    return toXML({ 
      customers: data.customers.map(customer => ({
        customer: [
          { id: customer.id },
          { name: customer.name },
          { address: [
            { street: customer.address.street },
            { number: customer.address.number },
            { city: customer.address.city },
            { state: customer.address.state },
            { zip: customer.address.zip }
          ]}
        ]
      })),
    }, xmlOptions);
  }
}