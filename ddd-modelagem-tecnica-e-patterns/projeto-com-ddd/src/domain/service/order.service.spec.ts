import Customer from '../entity/Customer';
import Order from '../entity/Order';
import OrderItem from '../entity/OrderItem';
import OrderService from './order.service';

describe('Order service unit tests', () => {
  it('should place an order', () => {
    const customer = new Customer('c1', 'Customer 1');
    const item1 = new OrderItem('i1', 'p1', 'Item 1', 10, 1);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });


  it('should get total of all orders', () => {
    const item1 = new OrderItem('i1', 'p1', 'Item 1', 100, 1);
    const item2 = new OrderItem('i2', 'p2', 'Item 2', 200, 2);

    const order1 = new Order('o1', 'c1', [item1]);
    const order2 = new Order('o2', 'c2', [item2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(500);
  });
});