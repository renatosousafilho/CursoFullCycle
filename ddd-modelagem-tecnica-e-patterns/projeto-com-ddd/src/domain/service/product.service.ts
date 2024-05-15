import Product from '../entity/Product';

export default class ProductService {
  static changePrice(products: Product[], percentage: number) {
    products.forEach(product => {
      const newPrice = product.price + (product.price * percentage / 100);
      product.changePrice(newPrice);
    });

    return products;
  }
}