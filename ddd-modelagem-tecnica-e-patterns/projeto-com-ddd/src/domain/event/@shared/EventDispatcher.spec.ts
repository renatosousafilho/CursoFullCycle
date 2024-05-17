import SendEmailWhenProductIsCreatedHandler from '../product/handler/SendEmailWhenProductIsCreatedHandler';
import EventDispatcher from './EventDispatcher';

describe('Domain event test', () => {
  it.only('should test event dispatcher', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.findHandlersForEvent('ProductCreatedEvent')
    ).toBeDefined();

    expect(
      eventDispatcher.findHandlersForEvent('ProductCreatedEvent')?.size
    ).toBe(1);

    expect(
      eventDispatcher.findHandlersForEvent('ProductCreatedEvent')
    ).toContain(eventHandler);
  });
});