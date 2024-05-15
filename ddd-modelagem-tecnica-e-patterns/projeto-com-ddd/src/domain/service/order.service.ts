import Customer from '../entity/Customer';
import Order from '../entity/Order';
import OrderItem from '../entity/OrderItem';

export default class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error('Order must have at least one item');
    }

    const order = new Order('o1', customer.id, items);
    customer.addRewardPoints(order.total() / 2);
    return order;
  }

  static total(orders: Order[]) {
    return orders.reduce((acc, order) => {
      return acc + order.total();
    }, 0);
  }
}