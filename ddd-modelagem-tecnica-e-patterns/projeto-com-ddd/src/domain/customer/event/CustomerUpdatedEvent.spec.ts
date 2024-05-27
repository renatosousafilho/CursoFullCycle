import EventDispatcher from '../../@shared/event/EventDispatcher';
import Address from '../entity/value-object/Address';
import Customer from '../entity/Customer';
import CustomerCreatedEvent from './CustomerCreatedEvent';
import CustomerUpdatedEvent from './CustomerUpdatedEvent';
import EnviaConsoleLog1Handler from './handler/EnviaConsoleLog1Handler';
import EnviaConsoleLog2Handler from './handler/EnviaConsoleLog2Handler';
import ShowConsoleLogWhenUserAddressIsUpdated from './handler/ShowConsoleLogWhenUserAddressIsUpdated';

describe('CustomerCreatedEvent', () => {
  it('should notify all handlers for a specific event', () => {
    // Arrange
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new ShowConsoleLogWhenUserAddressIsUpdated();
    eventDispatcher.register('CustomerUpdatedEvent', eventHandler);
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');
    const customer = new Customer('1', 'John Doe');
    const address = new Address('Main Street', 123, 'Springfield', 'IL', '12345678');
    customer.changeAddress(address);
    customer.activate();
    const customerEventUpdated = new CustomerUpdatedEvent(customer);
    
    // Act
    eventDispatcher.notify(customerEventUpdated);
    
    // Assert
    expect(spyEventHandler).toHaveBeenCalledTimes(1);
  });
});