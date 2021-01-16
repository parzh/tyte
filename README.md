# `tyte`

Write Jest tests for TypeScript types.

# Usage

```ts
export type MyNumber = number;
```

## Positive testing:

```ts
test("MyNumber should resolve to a number", tyte((value: MyNumber) => {
	tyte.expectType<number>(value);
}));
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
