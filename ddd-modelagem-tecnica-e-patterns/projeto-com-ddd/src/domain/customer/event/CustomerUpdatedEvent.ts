import EventInterface from '../../@shared/event/EventInterface';
import Customer from '../entity/Customer';

export default class CustomerUpdatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: Customer;

  constructor(customer: Customer) {
    this.dataTimeOccurred = new Date();
    this.eventData = customer;
  }
}