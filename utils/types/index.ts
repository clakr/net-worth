export type LaravelModel = {
	id: number;
	createdAt: Date;
	updatedAt: Date;
};

export type Resource<T> = {
	data: T;
};
