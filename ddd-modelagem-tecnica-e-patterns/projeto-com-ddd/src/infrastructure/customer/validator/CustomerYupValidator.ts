import Customer from '../../../domain/customer/entity/Customer';
import CustomerValidator from '../../../domain/customer/entity/validator/CustomerValidator';
import * as yup from 'yup';

export default class CustomerYupValidator implements CustomerValidator {
  validateCreateCustomer(customer: Customer): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required('ID is required'),
        name: yup.string().required('Name is required'),
      });

      schema.validateSync({
        id: customer.id,
        name: customer.name,
      }, { abortEarly: false })
    } catch (error) {
      const e = error as yup.ValidationError;
      e.errors.forEach((error: any) => {
        customer.notification.addError(error, 'customer');
      });
    }
  }
}