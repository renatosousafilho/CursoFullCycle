import Order from '../entity/Order';
import OrderItem from '../entity/OrderItem';


interface OrderFactoryProps {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    productId: string;
    quantity: number;
    price: number;
  }[];
}

export default class OrderFactory {
  static create(props: OrderFactoryProps): Order {
    const items = props.items.map((item) => {
      return new OrderItem(
        item.id,
        item.productId,
        item.name,
        item.price,
        item.quantity,
      )
    });

    return new Order(props.id, props.customerId, items);
  }
}