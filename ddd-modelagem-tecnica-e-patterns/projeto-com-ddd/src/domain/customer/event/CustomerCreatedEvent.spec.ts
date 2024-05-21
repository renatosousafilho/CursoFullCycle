import EventDispatcher from '../../@shared/event/EventDispatcher';
import CustomerCreatedEvent from './CustomerCreatedEvent';
import EnviaConsoleLog1Handler from './handler/EnviaConsoleLog1Handler';
import EnviaConsoleLog2Handler from './handler/EnviaConsoleLog2Handler';

describe('CustomerCreatedEvent', () => {
  it('should notify all handlers for a specific event', () => {
     // Arrange
     const eventDispatcher = new EventDispatcher();
     const eventHandler1 = new EnviaConsoleLog1Handler();
     const eventHandler2 = new EnviaConsoleLog2Handler();
     eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
     eventDispatcher.register('CustomerCreatedEvent', eventHandler2);
     const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle');
     const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');

     const customerEventCreated = new CustomerCreatedEvent({ name: 'Customer 1' });
     
     // Act
     eventDispatcher.notify(customerEventCreated);
 
     // Assert
      expect(spyEventHandler1).toHaveBeenCalledTimes(1);
      expect(spyEventHandler2).toHaveBeenCalledTimes(1);
  });
});