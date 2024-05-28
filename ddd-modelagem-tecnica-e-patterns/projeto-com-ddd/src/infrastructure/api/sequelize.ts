import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../customer/repository/sequelize/CustomerModel';

export default class SequelizeSingleton {
  private static instance: Sequelize;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!SequelizeSingleton.instance) {
      SequelizeSingleton.instance = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        models: [CustomerModel]
      });
    }

    return SequelizeSingleton.instance;
  }

  public static async sync(): Promise<void> {
    await SequelizeSingleton.getInstance().sync();
  }

  public static async close(): Promise<void> {
    await SequelizeSingleton.getInstance().close();
    SequelizeSingleton.instance = null;
  }
}