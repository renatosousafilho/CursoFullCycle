import Customer from "../Customer";

export default interface CustomerValidator {
  validateCreateCustomer(customer: Customer): void;
}