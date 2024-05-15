export default interface RepositoryInterface<T> {
  save(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  find(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}