import Order from '../../../../domain/checkout/entity/Order';
import OrderItemModel from './OrderItemModel';
import OrderModel from './OrderModel';

export default class OrderRepository  {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        product_id: item.productId,
      }))
    }, { include: [{ model: OrderItemModel}] });
  }
}