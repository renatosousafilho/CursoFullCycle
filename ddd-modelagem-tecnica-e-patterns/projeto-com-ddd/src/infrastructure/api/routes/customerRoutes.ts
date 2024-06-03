import { Router } from 'express';
import CustomerRepository from '../../customer/repository/sequelize/CustomerRepository';
import CreateCustomerUseCase from '../../../usecase/customer/CreateCustomerUseCase';
import ListCustomersUseCase from '../../../usecase/customer/ListCustomersUseCase';
import CustomerPresenter from '../presenters/customer.presenter';

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

customerRoutes.get('/', async (req, res) => {
  const repository = new CustomerRepository();
  const listCustomerUseCase = new ListCustomersUseCase(repository);

  const output = await listCustomerUseCase.execute({})

  res.format({
    json: () => res.json(output),
    xml: () => {
      res.type('application/xml');
      res.send(CustomerPresenter.toXML(output));
    }
  });
});

export default customerRoutes;
