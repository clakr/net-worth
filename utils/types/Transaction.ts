import type { LaravelModel } from ".";

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
>;
export type UserCreateTransactionCredentialsErrors = Record<
	keyof UserCreateTransactionCredentials,
	string[]
>;
