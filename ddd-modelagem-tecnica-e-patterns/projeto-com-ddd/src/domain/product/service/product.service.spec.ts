import Product from '../entity/Product';
import ProductService from './product.service';

describe('Product service unit tests', () => {
  it('should change the price of all products', () => {
    const product1 = new Product('p1', 'Product 1', 10);
    const product2 = new Product('p2', 'Product 2', 20);  

    const products = [product1, product2];

    ProductService.changePrice(products, 100);

    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
  });
});