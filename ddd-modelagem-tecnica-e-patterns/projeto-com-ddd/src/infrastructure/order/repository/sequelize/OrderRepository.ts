import Order from '../../../../domain/checkout/entity/Order';
import OrderItem from '../../../../domain/checkout/entity/OrderItem';
import OrderRepositoryInterface from '../../../../domain/checkout/repository/OrderRepositoryInterface';
import OrderItemModel from './OrderItemModel';
import OrderModel from './OrderModel';

export default class OrderRepository implements OrderRepositoryInterface {
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
  
  async update(entity: Order): Promise<void> {
    try{
      await OrderModel.update({
        customer_id: entity.customerId,
        total: entity.total(),
      }, { 
        where: { id: entity.id },
      });
      
      await Promise.all(entity.items.map(async (item) => {
        await OrderItemModel.update({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          product_id: item.productId,
        }, {
          where: { id: item.id },
        });
      }));
    } catch (error) {
      console.error(error);
    }
  }

  async find(id: string): Promise<Order | null> {
    const order = await OrderModel.findByPk(id, { include: OrderItemModel });
    if (!order) {
      return null;
    }

    return new Order(
      order.id,
      order.customer_id,
      order.items.map(item => new OrderItem(
        item.id,
        item.product_id,
        item.name,
        item.price,
        item.quantity,
      )),
    );
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({ include: OrderItemModel });
    return orders.map(order => new Order(
      order.id,
      order.customer_id,
      order.items.map(item => new OrderItem(
        item.id,
        item.product_id,
        item.name,
        item.price,
        item.quantity,
      )),
    ));
  }
}