import EventDispatcherInterface from './EventDispatcherInterface';
import EventHandlerInterface from './EventHandlerInterface';
import EventInterface from './EventInterface';

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: Map<string, Set<EventHandlerInterface<EventInterface>>> = new Map();

  get getEventHandlers(): Map<string, Set<EventHandlerInterface<EventInterface>>> {
    return this.eventHandlers;
  }

  findHandlersForEvent(event: string): Set<EventHandlerInterface<EventInterface>> {
    return this.eventHandlers.get(event);
  }

  notify(event: EventInterface): void {
    const handlers = this.findHandlersForEvent(event.constructor.name);
    if (handlers) {
      handlers.forEach((handler) => handler.handle(event));
    }
  }
  
  register(event: string, handler: EventHandlerInterface<EventInterface>): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set());
    }
    this.eventHandlers.get(event).add(handler);
  }
  
  unregister(event: string, handler: EventHandlerInterface<EventInterface>): void {
    if (!this.eventHandlers.has(event)) {
      return;
    }
    this.eventHandlers.get(event).delete(handler);
  }

  unregisterAll(): void {
    this.eventHandlers.clear();
  }

}