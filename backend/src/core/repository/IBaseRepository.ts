export interface IBaseRepository<T> {
  insertOne(data: T): Promise<T>;
  getMany(limit?: number, page?: number): Promise<T[]>;
  getOne(params: object): Promise<T>;
  updateOneById(_id: string, params: object): Promise<T>;
  getCountByIds(ids: string[]): Promise<number>;
}
