import request from 'supertest';
import app from '../../src/infrastructure/api/express';
import { Sequelize } from 'sequelize';
import SequelizeSingleton from '../../src/infrastructure/api/sequelize';

describe('GET /customer', () => {
  beforeEach(async () => {
    await SequelizeSingleton.sync();
  });

  afterEach(async () => {
    await SequelizeSingleton.close();
  });
  
  it('should return 200 status code and a list of customers', async () => {
    // Arrange
    const response1 = await request(app).post('/customer').send({
      name: 'John Doe',
      address: {
        street: 'Av. Paulista',
        number: 1000,
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01310-100'
      }
    });
    expect(response1.status).toBe(201);
    const response2 = await request(app).post('/customer').send({
      name: 'Jane Doe',
      address: {
        street: 'Av. Afonso Pena',
        number: 2000,
        city: 'Belo Horizonte',
        state: 'MG',
        zipCode: '30130-007'
      }
    });
    expect(response2.status).toBe(201);

    // Act
    const response = await request(app).get('/customer');

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBe(2);
    expect(response.body.customers[0].name).toBe("John Doe");
    // verificar o endereco
    expect(response.body.customers[0].address).toMatchObject({
      street: 'Av. Paulista',
      number: 1000,
      city: 'São Paulo',
      state: 'SP',
      zip: '01310-100'
    });
      
    expect(response.body.customers[1].name).toBe("Jane Doe");
    expect(response.body.customers[1].address).toMatchObject({
      street: 'Av. Afonso Pena',
      number: 2000,
      city: 'Belo Horizonte',
      state: 'MG',
      zip: '30130-007'
    });

    const responseXML = await request(app)
      .get('/customer')
      .set('Accept', 'application/xml')
      .send();
    expect(responseXML.status).toBe(200);
    expect(responseXML.text).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(responseXML.text).toContain(`<customers>`);
    expect(responseXML.text).toContain(`<customer>`);
    expect(responseXML.text).toContain(`<name>John Doe</name>`);
    expect(responseXML.text).toContain(`<name>Jane Doe</name>`);
    expect(responseXML.text).toContain(`</customers>`);
    expect(responseXML.text).toContain(`</customer>`);


  });
});