export interface IBaseRepository<T> {
    insertOne(data: T): Promise<T>;
    getMany(limit?: number, page?: number): Promise<T[]>;
    getOne(params: object): Promise<T>;
    updateOne(query: object, params: object): Promise<T>;
}
