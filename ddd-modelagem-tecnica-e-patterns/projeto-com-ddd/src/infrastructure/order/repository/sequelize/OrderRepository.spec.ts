import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../customer/repository/sequelize/CustomerModel';
import ProductModel from '../../../product/repository/sequelize/ProductModel';
import OrderModel from './OrderModel';
import OrderItemModel from './OrderItemModel';
import CustomerRepository from '../../../customer/repository/sequelize/CustomerRepository';
import ProductRepository from '../../../product/repository/sequelize/ProductRepository';
import OrderRepository from './OrderRepository';

import Customer from '../../../../domain/customer/entity/Customer';
import Address from '../../../../domain/customer/entity/Address';
import Product from '../../../../domain/product/entity/Product';
import Order from '../../../../domain/checkout/entity/Order';
import OrderItem from '../../../../domain/checkout/entity/OrderItem';

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

  it('should update the customer of an order', async () => {
    // Arrange
    // Create a customer
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John Doe");
    const address = new Address("Main Street", 123, "Springfield", "IL", "62701");
    customer.changeAddress(address);
    await customerRepository.create(customer);
    
    // Create a product
    const productRepository = new ProductRepository();
    const product = new Product("1", "Book", 10);
    await productRepository.create(product);

    // Create an order
    const orderItem = new OrderItem("1", product.id, product.name, product.price, 2);
    const order = new Order("1", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    // Act
    const customer2 = new Customer("2", "Jane Doe");
    const address2 = new Address("Main Street", 123, "Springfield", "IL", "62701");
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);
    order.changeCustomer(customer2.id);
    await orderRepository.update(order);

    // Assert
    const orderFound = await OrderModel.findByPk(order.id, { include: OrderItemModel });
    expect(orderFound.toJSON()).toStrictEqual({
      id: '1',
      customer_id: customer2.id,
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

  it('should update the items of an order', async () => {
    // Arrange
    // Create a customer
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John Doe");
    const address = new Address("Main Street", 123, "Springfield", "IL", "62701");
    customer.changeAddress(address);
    await customerRepository.create(customer);
    
    // Create a product
    const productRepository = new ProductRepository();
    const product = new Product("1", "Book", 10);
    await productRepository.create(product);

    // Create an order
    const orderItem = new OrderItem("1", product.id, product.name, product.price, 2);
    const order = new Order("1", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    // Act
    const product2 = new Product("2", "Notebook", 15);
    await productRepository.create(product2);
    order.changeItem(orderItem.id, product2.id, product2.name, product2.price, 1);
    await orderRepository.update(order);

    // Assert
    const orderFound = await OrderModel.findByPk(order.id, { include: OrderItemModel });
    expect(orderFound.toJSON()).toStrictEqual({
      id: '1',
      customer_id: customer.id,
      total: 15,
      items: [{
        id: orderItem.id,
        name: "Notebook",
        price: 15,
        quantity: 1,
        order_id: order.id,
        product_id: "2",
      }]
    });
  });

  it('should find an order by id', async () => {
    // Arrange
    // Create a customer
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John Doe");
    const address = new Address("Main Street", 123, "Springfield", "IL", "62701");
    customer.changeAddress(address);
    await customerRepository.create(customer);
    
    // Create a product
    const productRepository = new ProductRepository();
    const product = new Product("1", "Book", 10);
    await productRepository.create(product);

    // Create an order
    const orderItem = new OrderItem("1", product.id, product.name, product.price, 2);
    const order = new Order("1", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    // Act
    const orderFound = await orderRepository.find(order.id);

    // Assert
    expect(orderFound).toStrictEqual(order);
  });

  it('should find all orders', async () => {
    // Arrange
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    // Create a customer
    const customer = new Customer("1", "John Doe");
    const address = new Address("Main Street", 123, "Springfield", "IL", "62701");
    customer.changeAddress(address);
    const customer2 = new Customer("2", "Jane Doe");
    const address2 = new Address("Main Street", 123, "Springfield", "IL", "62701");
    customer2.changeAddress(address2);
    await customerRepository.create(customer);
    await customerRepository.create(customer2);
    
    // Create a product
    const product = new Product("1", "Book", 10);
    const product2 = new Product("2", "Notebook", 15);
    await productRepository.create(product);
    await productRepository.create(product2);

    // Create an order
    const orderItem = new OrderItem("1", product.id, product.name, product.price, 2);
    const order = new Order("1", customer.id, [orderItem]);

    const orderItem2 = new OrderItem("2", product2.id, product2.name, product2.price, 1);
    const order2 = new Order("2", customer2.id, [orderItem2]);
    
    await orderRepository.create(order);
    await orderRepository.create(order2);

    // Act
    const orders = await orderRepository.findAll();
    expect(orders).toStrictEqual([order, order2]);
  });
});