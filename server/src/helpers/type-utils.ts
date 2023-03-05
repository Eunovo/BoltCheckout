export type GetCreateDto<T> = Omit<T, '_id' | 'createdAt' | 'lastUpdatedAt' >;
