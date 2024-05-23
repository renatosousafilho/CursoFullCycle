import CustomerCreatedEvent from '../CustomerCreatedEvent';
import EventHandlerInterface from '../../../@shared/event/EventHandlerInterface';

export default class EnviaConsoleLog2Handler implements EventHandlerInterface<CustomerCreatedEvent>{
  handle(event: CustomerCreatedEvent): void {
    console.log(`Esse é o segundo console.log do evento: CustomerCreatedEvent`);
  }
}