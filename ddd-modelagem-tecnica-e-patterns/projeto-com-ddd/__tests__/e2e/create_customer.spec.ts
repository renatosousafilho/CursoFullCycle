import request from 'supertest';
import app from '../../src/infrastructure/api/express';
import { Sequelize } from 'sequelize';
import SequelizeSingleton from '../../src/infrastructure/api/sequelize';

describe('POST /customer', () => {
  beforeEach(async () => {
    await SequelizeSingleton.sync();
  });

  afterEach(async () => {
    await SequelizeSingleton.close();
  });

  it('when are passed valid data, should return 201 status code and the created customer', async () => {
    // Arrange
    const customer = {
      name: 'John Doe',
      address: {
        street: 'Av. Paulista',
        number: 1000,
        city: 'São Paulo',
        state: 'SP',
        country: 'Brazil',
        zipCode: '01310-100'
      }
    }
    
    // Act
    const response = await request(app)
      .post('/customer')
      .send(customer)
        
    // Assert
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(customer.name);
    expect(response.body.address.street).toBe(customer.address.street);
    expect(response.body.address.number).toBe(customer.address.number);
    expect(response.body.address.city).toBe(customer.address.city);
    expect(response.body.address.state).toBe(customer.address.state);
    expect(response.body.address.zip).toBe(customer.address.zipCode);
  });

  it('when are passed invalid name, should return 400 status code and the error message', async () => {
    // Arrange
    const customer = {
      name: '',
      address: {
        street: 'Av. Paulista',
        number: 1000,
        city: 'São Paulo',
        state: 'SP',
        country: 'Brazil',
        zipCode: '01310-100'
      }
    };

    // Act
    const response = await request(app)
      .post('/customer')
      .send(customer);

    // Assert
    expect(response.body.message).toBe('customer: Name is required');
    expect(response.status).toBe(400);
  });
});