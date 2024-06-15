import type { LaravelModel } from ".";
import type { Category } from "./Category";
import type { SubCategory } from "./SubCategory";

export enum TransactionType {
	EXPENSE = "expense",
	INCOME = "income",
}

export type Transaction = LaravelModel & {
	type: TransactionType;
	name: string;
	description: string;
	amount: number;
};

export type UserCreateTransactionCredentials = Pick<
	Transaction,
	"type" | "name" | "description" | "amount" | "createdAt"
> & {
	categoryId: Category["id"];
	subCategoryId: SubCategory["id"];
};

export type UserCreateTransactionCredentialsErrors = Record<
	keyof UserCreateTransactionCredentials,
	string[]
>;
