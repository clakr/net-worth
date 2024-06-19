import type { LaravelModel } from ".";

export enum CategoryType {
	EXPENSE = "expense",
	INCOME = "income",
}

export type Category = LaravelModel & {
	name: string;
	type: CategoryType;
};

export type AdminCreateCategoryCredentials = Pick<Category, "name" | "type">;

export type AdminCreateCategoryCredentialsErrors = Record<
	keyof AdminCreateCategoryCredentials,
	string[]
>;

export type AdminEditCategoryCredentials = AdminCreateCategoryCredentials;

export type AdminEditCategoryCredentialsErrors = Record<
	keyof AdminEditCategoryCredentials,
	string[]
>;
