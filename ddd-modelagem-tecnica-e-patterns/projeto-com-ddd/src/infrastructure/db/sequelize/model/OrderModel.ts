import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import CustomerModel from './CustomerModel';
import OrderItemModel from './OrderItemModel';

@Table({
  tableName: 'orders',
  timestamps: false,
})
export default class OrderModel extends Model {
  
  @PrimaryKey
  @Column
  declare id: string;
  
  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare customer_id: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];

  @Column({ allowNull: false })
  declare total: number;
}