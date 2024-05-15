import { Sequelize } from 'sequelize-typescript';

describe('ProductRepository', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

});