import EventInterface from '../../@shared/event/EventInterface';

export default class ProductCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(product: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = product;
  }
}