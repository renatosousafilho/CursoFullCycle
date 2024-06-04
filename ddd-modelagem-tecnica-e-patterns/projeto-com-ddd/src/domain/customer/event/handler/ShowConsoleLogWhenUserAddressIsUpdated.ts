import EventHandlerInterface from '../../../@shared/event/EventHandlerInterface';
import CustomerUpdatedEvent from '../CustomerUpdatedEvent';
export default class ShowConsoleLogWhenUserAddressIsUpdated implements EventHandlerInterface<CustomerUpdatedEvent>{
  handle(event: CustomerUpdatedEvent): void {
    console.log(`Endereço do cliente ${event.eventData.name} foi atualizado para ${event.eventData.address}`);
  }
}