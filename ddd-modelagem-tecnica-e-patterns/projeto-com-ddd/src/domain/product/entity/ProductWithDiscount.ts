import ProductInterface from './ProductInterface';

export default class ProductWithDiscount implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;
  private _discount: number;

  constructor(id: string, name: string, price: number, discount: number = 0.1) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._discount = discount;
  }


  get id(): string {
    return this._id;
  }
  
  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price - (this._price * this._discount / 100);
  }

  get discount(): number {
    return this._discount;
  }
}