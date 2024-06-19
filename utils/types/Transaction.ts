import type { LaravelModel } from ".";
import type { Category } from "./Category";
import type { SubCategory } from "./SubCategory";

export type Transaction = LaravelModel & {
	name: string;
	description: string;
	amount: number;
};

export type UserCreateTransactionCredentials = Pick<
	Transaction,
	"name" | "description" | "amount" | "createdAt"
> & {
	categoryId: Category["id"];
	subCategoryId: SubCategory["id"];
};

export type UserCreateTransactionCredentialsErrors = Record<
	keyof UserCreateTransactionCredentials,
	string[]
>;
