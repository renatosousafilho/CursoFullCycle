import Order from './Order';
import OrderItem from './OrderItem';

describe("Order", () => {
  it("should thrown an error if the id is empty", () => {
    expect(() => new Order("", "1", [])).toThrowError("ID is required");
  });

  it("should thrown an error if the customerId is empty", () => {
    expect(() => new Order("1", "", [])).toThrowError("ID is required");
  });

  it("should throw an error if the order has no items", () => {
    expect(() => new Order("1", "1", [])).toThrowError("An order must have at least one item");
  });

  it("should calculate the total of the order", () => {
    const order = new Order("o1", "c1", [
      new OrderItem("i1", "Item 1", 10, 1),
      new OrderItem("i2", "Item 2", 20, 1)
    ]);
    const total = order.total();
    expect(total).toBe(30);
  });
});