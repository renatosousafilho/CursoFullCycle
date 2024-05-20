import Product from '../../domain/product/entity/Product';
import ProductRepositoryInterface from '../../domain/product/repository/ProductRepositoryInterface';
import ProductModel from '../db/sequelize/model/ProductModel';

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update({
      name: entity.name,
      price: entity.price,
    }, {
      where: { id: entity.id },
    });
  }

  async find(id: string): Promise<Product> {
    const foundProduct = await ProductModel.findByPk(id);

    return new Product(foundProduct.id, foundProduct.name, foundProduct.price);
  }
  
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();

    return products.map((product) => new Product(product.id, product.name, product.price));
  }
}