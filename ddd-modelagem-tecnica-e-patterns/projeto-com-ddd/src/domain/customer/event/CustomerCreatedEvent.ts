import EventInterface from '../../@shared/event/EventInterface';

export default class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(customer: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = customer;
  }
}