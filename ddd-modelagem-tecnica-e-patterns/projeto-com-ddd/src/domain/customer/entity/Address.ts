export default class Address {
  private _street: string;
  private _number: number;
  private _city: string;
  private _state: string;
  private _zipCode: string;

  constructor(street: string, number: number, city: string, state: string, zipCode: string) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._state = state;
    this._zipCode = zipCode;
    // this.validate();
  }

  validate() {
    if (!this._street) {
      throw new Error('Street is required');
    }

    if (!this._number) {
      throw new Error('Number is required');
    }

    if (!this._city) {
      throw new Error('City is required');
    }

    if (!this._state) {
      throw new Error('State is required');
    }

    if (!this._zipCode) {
      throw new Error('Zip code is required');
    }

    if (this._zipCode.length !== 8) {
      throw new Error('Zip code must have 8 characters');
    }
  }

  get street() {
    return this._street;
  }

  get number() {
    return this._number;
  }

  get city() {
    return this._city;
  }

  get state() {
    return this._state;
  }

  get zipCode() {
    return this._zipCode;
  }
}