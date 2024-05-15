import Order from '../entity/Order';

export default class OrderService {
  static total(orders: Order[]) {
    return orders.reduce((acc, order) => {
      return acc + order.total();
    }, 0);
  }
}