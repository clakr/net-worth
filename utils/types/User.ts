import type { LaravelModel } from ".";

export enum UserRole {
	ADMIN = "admin",
	USER = "user",
}

export type User = LaravelModel & {
	name: string;
	email: string;
	emailVerifiedAt: Date;
	role: UserRole;
};

export type AdminCreateUserCredentials = Pick<User, "name" | "email" | "role">;
export type AdminCreateUserCredentialsErrors = Record<
	keyof AdminCreateUserCredentials,
	string[]
>;

export type AdminEditUserCredentials = AdminCreateUserCredentials;
export type AdminEditUserCredentialsErrors = Record<
	keyof AdminEditUserCredentials,
	string[]
>;
