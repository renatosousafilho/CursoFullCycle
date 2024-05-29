import CustomerInterface from './CustomerInterface';
import Address from './value-object/Address';
import Notification from '../../@shared/notification/Notification';

export default class Customer implements CustomerInterface {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  private _notification: Notification;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this._notification = new Notification();

    this.validate();

    if (this._notification.hasErrors()) {
      throw new Error(this._notification.messages('customer'));
    }
  }

  validate() {
    if (this._id.length === 0) {
      this._notification.addError('ID is required', 'customer');
    }
    if (!this._name) {
      this._notification.addError('Name is required', 'customer');
    }
  }

  changeName(name: string) {
    this._name = name;
  }

  activate() {
    if (!this._address) {
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