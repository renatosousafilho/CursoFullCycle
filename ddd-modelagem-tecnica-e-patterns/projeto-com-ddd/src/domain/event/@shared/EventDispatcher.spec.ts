import SendEmailWhenProductIsCreatedHandler from '../product/handler/SendEmailWhenProductIsCreatedHandler';
import EventDispatcher from './EventDispatcher';

describe('Domain event test', () => {
  it('should register a handler for a specific event', () => {
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

  it('should unregister a handler for a specific event', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.findHandlersForEvent('ProductCreatedEvent')
    ).toBeDefined();

    expect(
      eventDispatcher.findHandlersForEvent('ProductCreatedEvent')?.size
    ).toBe(0);

    expect(
      eventDispatcher.findHandlersForEvent('ProductCreatedEvent')
    ).not.toContain(eventHandler);
  });
});