import CustomerInterface from './CustomerInterface';
import Address from './value-object/Address';
import Notification from '../../@shared/notification/Notification';
import CustomerYupValidator from '../../../infrastructure/customer/validator/CustomerYupValidator';
import CustomerValidator from './validator/CustomerValidator';

export default class Customer implements CustomerInterface {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  private _notification: Notification;
  private _validator: CustomerValidator;

  constructor(id: string, name: string, validator: CustomerValidator = new CustomerYupValidator()) {
    this._id = id;
    this._name = name;
    this._notification = new Notification();
    this._validator = validator;

    this.validate();

    if (this._notification.hasErrors()) {  
      throw new Error(this._notification.messages('customer'));
    }
  }

  validate() {
    this._validator.validateCreateCustomer(this);
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

  get notification() {
    return this._notification;
  }
}