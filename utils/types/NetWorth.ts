import type { LaravelModel } from ".";

export type NetWorth = LaravelModel & {
	amount: number;
};
