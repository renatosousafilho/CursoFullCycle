import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../db/sequelize/model/CustomerModel';
import ProductModel from '../db/sequelize/model/ProductModel';
import OrderModel from '../db/sequelize/model/OrderModel';
import OrderItemModel from '../db/sequelize/model/OrderItemModel';
import CustomerRepository from './CustomerRepository';
import ProductRepository from './ProductRepository';
import OrderRepository from './OrderRepository';

import Customer from '../../domain/entity/Customer';
import Address from '../../domain/entity/Address';
import Product from '../../domain/entity/Product';
import Order from '../../domain/entity/Order';
import OrderItem from '../../domain/entity/OrderItem';



describe('OrderRepository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a new order', async () => {
    // Arrange
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John Doe");
    const address = new Address("Main Street", 123, "Springfield", "IL", "62701");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Book", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", product.id, product.name, product.price, 2);
    const order = new Order("1", customer.id, [orderItem]);
    
    // Act
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    const orderFound = await OrderModel.findByPk(order.id, { include: OrderItemModel });

    expect(orderFound.toJSON()).toStrictEqual({
      id: '1',
      customer_id: '1',
      total: 20,
      items: [{
        id: orderItem.id,
        name: orderItem.name,
        price: orderItem.price,
        quantity: orderItem.quantity,
        order_id: order.id,
        product_id: orderItem.productId,
      }]
    });
  });
});