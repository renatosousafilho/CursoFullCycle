import Product from '../entity/Product';
import ProductFactory from './ProductFactory';

describe('ProductFactory', () => {
  it('should create a simple product', () => {
    // Arrange
    const type = 'simple';
    const name = 'Product 1';
    const price = 100;

    // Act
    const product = ProductFactory.create(type, name, price);
    
    // Assert
    expect(product.constructor.name).toBe('Product');
  });

  it('should create a product with discount', () => {
    // Arrange
    const type = 'discount';
    const name = 'Product 1';
    const price = 100;

    // Act
    const product = ProductFactory.create(type, name, price);
    
    // Assert
    expect(product.constructor.name).toBe('ProductWithDiscount');
  });

  it('should throw an error if the product type is invalid', () => {
    expect(() => ProductFactory.create('invalid', 'Product 1', 100)).toThrowError('Invalid product type');
  });
});