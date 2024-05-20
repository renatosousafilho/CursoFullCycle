import { Sequelize } from 'sequelize-typescript';
import ProductModel from './ProductModel';
import Product from '../../../../domain/product/entity/Product';
import ProductRepository from './ProductRepository';

describe('ProductRepository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();

    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('p1', 'Product 1', 10);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: 'p1' } });

    expect(productModel.toJSON()).toStrictEqual({
      id: 'p1',
      name: 'Product 1',
      price: 10,
    });
  });

  it('should update a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('p3', 'Product 3', 30);

    await productRepository.create(product);

    product.changeName('Product 3 Updated');
    product.changePrice(40);

    await productRepository.update(product);

    const foundProduct = await ProductModel.findOne({ where: { id: 'p3' } });

    expect(foundProduct.toJSON()).toStrictEqual({
      id: 'p3',
      name: 'Product 3 Updated',
      price: 40,
    });
  });

   it('should find a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('p2', 'Product 2', 20);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: 'p2' } });
    const foundProduct = await productRepository.find('p2');

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  it('should find all products', async () => {  
    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Product 1", 100);
    const product2 = new Product("2", "Product 2", 100);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product1, product2];

    expect(foundProducts).toEqual(products);
  });
});