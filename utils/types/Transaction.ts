import type { LaravelModel } from ".";
import type { Category } from "./Category";

export enum TransactionType {
	EXPENSE = "expense",
	INCOME = "income",
}

export type Transaction = LaravelModel & {
	type: TransactionType;
	name: string;
	description: string;
	amount: number;
	category?: Category;
};

export type UserCreateTransactionCredentials = Pick<
	Transaction,
	"type" | "name" | "description" | "amount" | "createdAt"
> & {
	categoryId: Category["id"];
};

export type UserCreateTransactionCredentialsErrors = Record<
	keyof UserCreateTransactionCredentials,
	string[]
>;
