export interface Crud {
  load(id: Number): any ;
  saveOrUpdate<T extends any >(model: T): T;
  delete(id: Number);
}
