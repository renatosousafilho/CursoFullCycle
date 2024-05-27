import CustomerCreatedEvent from '../CustomerCreatedEvent';
import EventHandlerInterface from '../../../@shared/event/EventHandlerInterface';
export default class ShowConsoleLogWhenUserAddressIsUpdated implements EventHandlerInterface<CustomerCreatedEvent>{
  handle(event: CustomerCreatedEvent): void {
    // console.log(`Endereço do cliente ${event.eventData.name} foi atualizado para ${event.eventData.address}`);
  }
}