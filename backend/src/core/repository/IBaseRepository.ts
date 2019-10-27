export interface IBaseRepository<T> {
    insertOne(data: T): Promise<T>;
    getMany(limit?: number, page?: number): Promise<T[]>;
}
