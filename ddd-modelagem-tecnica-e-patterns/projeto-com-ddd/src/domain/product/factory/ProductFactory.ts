import Product from '../entity/Product';
import ProductWithDiscount from '../entity/ProductWithDiscount';
import { v4 as uuid } from 'uuid';

export default class ProductFactory {
  static create(type: string, name: string, price: number) {
    const id = uuid();
    switch (type) {
      case 'simple':
        return new Product(id, name, price);
      case 'discount':
        return new ProductWithDiscount(id, name, price);
      default:
        throw new Error('Invalid product type');
    }
  }
}