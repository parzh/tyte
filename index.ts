/**
 * A noop function that prevents the given jest callback from actually running
 * @example
 * type MyType = number;
 * 
 * describe("MyType", () => {
 * 	it("resolves to a number", tyte((
 * 		value: MyType,
 * 		values: MyType[],
 * 	) => {
 * 		tyte.expectType<number>(value);
 * 		tyte.expectType<number[]>(values);
 * 	}));
 * });
 */
function tyte<Args extends any[], Callback extends (...args: Args) => void>(callback: Callback): Callback {
	return (() => {}) as Callback;
}

namespace tyte {
	/**
	 * Substitute for a type in .each arrays
	 * @example
	 * test.each([
	 * 	tyte.subject as number,
	 * 	tyte.subject as string,
	 * ])("is a number or a string", tyte((subject) => {
	 * 	tyte.expectType<number | string>(subject);
	 * }));
	 */
	export const subject: unknown = null;

	/**
	 * Expect a given value to be of a given type
	 * @example
	 * tyte.expectType<number>(Date.now());
	 */
	export function expectType<Value = never>(subject: Value): void {}

	/**
	 * Sub-module for function-related TypeScript-only assertions
	 */
	export namespace fn {
		/**
		 * Expect a given function to have parameters according to a given list of types
		 * @example
		 * tyte.fn.expectParams<[number]>(Math.round);
		 * tyte.fn.expectParams<[]>(Math.random);
		 */
		export function expectParams<Params extends any[] = []>(subject: (...params: Params) => any): void {}

		/**
		 * Expect a given function to return a value of a given type
		 * @example
		 * tyte.fn.expectReturns<string>(Object.toString);
		 */
		export function expectReturns<Output = never>(subject: (...params: any[]) => Output): void {}
	}
}

export default tyte;
