import Address from './Address';

export default interface CustomerInterface {
  get id(): string;
  get name(): string;
  get address(): Address;
}