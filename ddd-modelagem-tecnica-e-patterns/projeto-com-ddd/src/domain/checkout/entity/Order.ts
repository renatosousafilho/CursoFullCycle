import OrderItem from './OrderItem';

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number = 0;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('ID is required');
    }

    if (this._customerId.length === 0) {
      throw new Error('Customer ID is required');
    }

    // verificar se o array de items está vazio
    if (this._items.length === 0) {
      throw new Error('An order must have at least one item');
    }
  }

  changeCustomer(customerId: string) {
    this._customerId = customerId;
    this.validate();
  }

  changeItem(id: string, productId: string, name: string, price: number, quantity: number) {
    const item = this._items.find(item => item.id === id);
    if (item) {
      item.changeName(name);
      item.changePrice(price);
      item.changeProductId(productId);
      item.changeQuantity(quantity);
    }
    this.validate();
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items() {
    return this._items;
  }
}