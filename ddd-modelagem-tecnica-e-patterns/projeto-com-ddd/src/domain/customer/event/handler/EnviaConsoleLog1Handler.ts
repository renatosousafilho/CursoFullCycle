import CustomerCreatedEvent from '../CustomerCreatedEvent';
import EventHandlerInterface from '../../../@shared/event/EventHandlerInterface';

export default class EnviaConsoleLog1Handler implements EventHandlerInterface<CustomerCreatedEvent>{
  handle(event: CustomerCreatedEvent): void {
    console.log(`Esse é o primeiro console.log do evento: CustomerCreatedEvent`);
  }
}