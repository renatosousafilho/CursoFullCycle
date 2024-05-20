import Product from './Product';

describe("Product", () => {
  it("should thrown an error if the id is empty", () => {
    expect(() => new Product("", "Produto 1", 100)).toThrowError("ID is required");
  });

  it("should thrown an error if the name is empty", () => {
    expect(() => new Product("1", "", 100)).toThrowError("Name is required");
  });

  it("should thrown an error if the price is negative", () => {
    expect(() => new Product("1", "Produto 1", -100)).toThrowError("Price must be greater than 0");
  });

  it('should change the product name', () => {
    const product = new Product("1", "Produto 1", 100);
    product.changeName("Produto 2");
    expect(product.name).toBe("Produto 2");
  });

  it('should change the product price', () => {
    const product = new Product("1", "Produto 1", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });
});