import EventInterface from '../@shared/EventInterface';

export default class ProductCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(product: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = product;
  }
}