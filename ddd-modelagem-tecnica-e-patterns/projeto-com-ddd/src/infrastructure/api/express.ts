import express from 'express';
import { Sequelize } from 'sequelize-typescript';

const app = express();

let sequelize: Sequelize;

async function setup() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });
  
  sequelize.addModels([/* models */])
  sequelize.sync()
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

export default app;