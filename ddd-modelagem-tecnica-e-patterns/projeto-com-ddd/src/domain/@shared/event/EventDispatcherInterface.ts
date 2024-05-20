import EventHandlerInterface from './EventHandlerInterface';
import EventInterface from './EventInterface';

export default interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  register(event: string, handler: EventHandlerInterface): void;
  unregister(event: string, handler: EventHandlerInterface): void;
  unregisterAll(): void;
}