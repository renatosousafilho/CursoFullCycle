import CustomerCreatedEvent from '../CustomerCreatedEvent';

export default class ShowConsoleLogWhenUserAddressIsUpdated {
  handle(event: CustomerCreatedEvent): void {
    console.log(`Endereço do cliente ${event.eventData.name} foi atualizado para ${event.eventData.address}`);
  }
}