import type { LaravelModel } from ".";
import type { Category } from "./Category";

export type SubCategory = LaravelModel & {
	name: string;
};

export type AdminCreateSubCategoryCredentials = Pick<SubCategory, "name"> & {
	categoryId: Category["id"];
};

export type AdminCreateSubCategoryCredentialsErrors = Record<
	keyof AdminCreateSubCategoryCredentials,
	string[]
>;

export type AdminEditSubCategoryCredentials = Pick<SubCategory, "name"> & {
	categoryId: Category["id"];
};

export type AdminEditSubCategoryCredentialsErrors = Record<
	keyof AdminCreateSubCategoryCredentials,
	string[]
>;
