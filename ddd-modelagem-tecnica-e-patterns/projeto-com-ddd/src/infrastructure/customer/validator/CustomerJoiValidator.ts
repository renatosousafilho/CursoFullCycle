import CustomerValidator from '../../../domain/customer/entity/validator/CustomerValidator';
import Joi from 'joi';

export default class CustomerJoiValidator implements CustomerValidator {
  validateCreateCustomer(customer: any): void {
    const schema = Joi.object({
      id: Joi.string().required().messages({
        'any.required': 'ID is required',
        "string.empty": 'ID is required'
      }),
      name: Joi.string().required().messages({
        'any.required': 'Name is required',
        'string.empty': 'Name is required'
      }),
    }).options({ abortEarly: false });

    const { error } = schema.validate({
      id: customer.id,
      name: customer.name,
    });

    if (error) {
      error.details.forEach((error: any) => {
        customer.notification.addError(error.message, 'customer');
      });
    }
  }
}