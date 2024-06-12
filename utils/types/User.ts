import type { LaravelModel } from ".";

export type User = LaravelModel & {
	name: string;
	email: string;
	emailVerifiedAt: Date;
};

export type AdminCreateUserCredentials = Pick<User, "name" | "email">;
export type AdminCreateUserCredentialsErrors = Record<
	keyof AdminCreateUserCredentials,
	string[]
>;

export type AdminEditUserCredentials = AdminCreateUserCredentials;
export type AdminEditUserCredentialsErrors = Record<
	keyof AdminEditUserCredentials,
	string[]
>;
