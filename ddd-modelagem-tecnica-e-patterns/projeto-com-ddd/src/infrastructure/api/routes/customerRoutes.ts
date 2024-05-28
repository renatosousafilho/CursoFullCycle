import { Router } from 'express';
import CustomerRepository from '../../customer/repository/sequelize/CustomerRepository';
import CreateCustomerUseCase from '../../../usecase/customer/CreateCustomerUseCase';

const customerRoutes = Router();

customerRoutes.post('/', async (req, res) => {
  const repository = new CustomerRepository();
  const createCustomerUseCase = new CreateCustomerUseCase(repository);

  const input = {
    name: req.body.name,
    address: {
      street: req.body.address.street,
      number: req.body.address.number,
      city: req.body.address.city,
      state: req.body.address.state,
      country: req.body.address.country,
      zip: req.body.address.zipCode
    }
  };

  const output = await createCustomerUseCase.execute(input)
    .catch((error) => res.status(400).json({ message: error.message }));

  res.status(201).json(output);
});

export default customerRoutes;
