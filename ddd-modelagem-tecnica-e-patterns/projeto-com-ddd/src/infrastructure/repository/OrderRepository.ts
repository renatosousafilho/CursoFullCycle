import Order from '../../domain/entity/Order';
import OrderItemModel from '../db/sequelize/model/OrderItemModel';
import OrderModel from '../db/sequelize/model/OrderModel';

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