import ProductCreatedEvent from '../../product/event/ProductCreatedEvent';
import SendEmailWhenProductIsCreatedHandler from '../../product/event/handler/SendEmailWhenProductIsCreatedHandler';
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

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.findHandlersForEvent('ProductCreatedEvent')
    ).toBeUndefined();
  });


  it('should notify all handlers for a specific event', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Product 1',
      description: 'Description of product 1',
      price: 100,
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});