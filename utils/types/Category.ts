import type { LaravelModel } from ".";

export type Category = LaravelModel & {
	name: string;
};

export type AdminCreateCategoryCredentials = Pick<Category, "name">;
export type AdminCreateCategoryCredentialsErrors = Record<
	keyof AdminCreateCategoryCredentials,
	string[]
>;

export type AdminEditCategoryCredentials = AdminCreateCategoryCredentials;
export type AdminEditCategoryCredentialsErrors = Record<
	keyof AdminEditCategoryCredentials,
	string[]
>;
