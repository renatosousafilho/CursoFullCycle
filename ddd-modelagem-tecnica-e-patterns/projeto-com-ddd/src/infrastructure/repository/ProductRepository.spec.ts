import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../db/sequelize/model/ProductModel';

describe('ProductRepository', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();

    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

});