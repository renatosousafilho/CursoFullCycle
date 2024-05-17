import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import ProductModel from './ProductModel';
import OrderModel from './OrderModel';

@Table({
  tableName: 'order_items',
  timestamps: false,
  underscored: true,
})
export default class OrderItemModel extends Model {
  
  @PrimaryKey
  @Column
  declare id: string;
  
  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  declare product_id: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare order_id: string;

  // Se deixar essa linha, o teste falha
  // ReferenceError: Cannot access 'OrderModel' before initialization
  @BelongsTo(() => OrderModel)
  declare order: Awaited<OrderModel>;

  @Column({ allowNull: false })
  declare quantity: number;

  @Column({ allowNull: false })
  declare price: number;

  @Column({ allowNull: false })
  declare name: string;
}