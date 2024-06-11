import type { LaravelModel } from ".";

export type User = LaravelModel & {
	name: string;
	email: string;
	emailVerifiedAt: Date;
};
