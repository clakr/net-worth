export default function (input: string): string {
	return input.replace(/^\w/, (c) => c.toUpperCase());
}
