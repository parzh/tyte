# `tyte`

Write Jest tests for TypeScript types.

# Usage

```ts
export type MyNumber = number;
export type MyFunction = (input: string) => boolean;
```

## Positive testing:

```ts
test("MyNumber should resolve to a number", tyte((value: MyNumber) => {
	tyte.expectType<number>(value);
}));

describe("MyFunction", () => {
	it("should take a string input", tyte((subject: MyFunction) => {
		tyte.fn.expectParams<[string]>(subject);
	}));

	it("should return a boolean", tyte((subject: MyFunction) => {
		tyte.fn.expectReturns<boolean>(subject);
	}));
});
```

## Negative testing:

```ts
test("MyNumber should not resolve to a string", tyte((value: MyNumber) => {
	// @ts-expect-error
	tyte.expectType<string>(value);
}));
```

## Use several subjects in test callback:

```ts
test("MyNumber should resolve to a number", tyte((
	value: MyNumber,
	values: MyNumber[],
) => {
	tyte.expectType<number>(value);
	tyte.expectType<number[]>(values);
}));
```

## Iterate over several subjects in [`.each` methods](https://jestjs.io/docs/en/api#methods):

```ts
type Vertical = "up" | "forward" | "down";
type Horizontal = "left" | "forward" | "right";

test.each([
	[ "Vertical", tyte.subject as Vertical & "forward" ],
	[ "Horizontal", tyte.subject as Horizontal & "forward" ],
])("%s should include 'forward'", (typeName, subject) => {
	tyte.expectType<"forward">(subject);
});
```
