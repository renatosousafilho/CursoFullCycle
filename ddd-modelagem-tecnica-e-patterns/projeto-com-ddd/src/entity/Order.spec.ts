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
      new OrderItem("i1", "p1", "Item 1", 10, 2),
      new OrderItem("i2", "p2", "Item 2", 20, 1)
    ]);
    const total = order.total();
    expect(total).toBe(40);
  });

  it("should throw an error if the order item has a quantity less than or equal to 0", () => {
    expect(() => {
      const orderItem = new OrderItem("i1", "p1", "Item 1", 10, 0);
    }).toThrowError("Quantity must be greater than 0");
  })
});