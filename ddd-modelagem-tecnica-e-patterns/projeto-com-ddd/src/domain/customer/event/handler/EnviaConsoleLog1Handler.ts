import CustomerCreatedEvent from '../CustomerCreatedEvent';

export default class EnviaConsoleLog1Handler {
  handle(event: CustomerCreatedEvent): void {
    console.log(`Esse é o primeiro console.log do evento: CustomerCreatedEvent`);
  }
}