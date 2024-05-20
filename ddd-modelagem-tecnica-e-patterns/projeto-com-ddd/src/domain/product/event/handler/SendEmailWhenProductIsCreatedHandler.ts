import EventHandlerInterface from '../../../@shared/event/EventHandlerInterface';
import ProductCreatedEvent from '../ProductCreatedEvent';

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
  handle(event: ProductCreatedEvent): void {
    console.log('SendEmailWhenProductIsCreatedHandler', event);
  }
}