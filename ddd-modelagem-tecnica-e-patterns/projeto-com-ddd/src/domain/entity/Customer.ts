import Address from './Address';

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate() {
    if (!this._name) {
      throw new Error('Name is required');
    }
    if (this._id.length === 0) {
      throw new Error('ID is required');
    }
  }

  changeName(name: string) {
    this._name = name;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate the customer');
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  isActive() {
    return this._active;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get rewardPoints() {
    return this._rewardPoints;
  }

  get address() {
    return this._address;
  }
}