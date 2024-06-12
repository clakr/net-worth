import type { LaravelModel } from ".";
import type { Transaction } from "./Transaction";

export type NetWorth = LaravelModel & {
	amount: number;
	transactions?: Transaction[];
};
