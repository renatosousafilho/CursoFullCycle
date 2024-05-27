import Address from './value-object/Address';

export default interface CustomerInterface {
  get id(): string;
  get name(): string;
  get address(): Address;
}