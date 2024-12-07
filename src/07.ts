import { AocClient } from "advent-of-code-client";
import type { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2024,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function part1(input: string) {
  return input
    .split("\n")
    .map((line) => line.split(": "))
    .map(([result, input]) => [
      parseInt(result),
      ...input.split(" ").map((i) => parseInt(i)),
    ])
    .reduce(
      (sum, [result, ...inputs]) =>
        testOperators(result, inputs.reverse()) ? sum + result : sum,
      0
    );
}

function testOperators(result: number, inputs: number[]): boolean {
  if (inputs.length === 1) {
    return result === inputs[0];
  }

  return (
    testOperators(result / inputs[0], inputs.slice(1)) ||
    testOperators(result - inputs[0], inputs.slice(1))
  );
}

function part2(input: string) {
  return input
    .split("\n")
    .map((line) => line.split(": "))
    .map(([result, input]) => [
      parseInt(result),
      ...input.split(" ").map((i) => parseInt(i)),
    ])
    .reduce((sum, [result, first, ...inputs]) => {
      const foo = testOperators2(result, first, inputs);
      console.log(result, inputs, foo);
      return foo ? sum + result : sum;
    }, 0);
}

function testOperators2(
  result: number,
  first: number,
  inputs: number[]
): boolean {
  if (inputs.length === 0) {
    return result === first;
  }
  const concat = parseInt(first.toString() + inputs[0].toString());

  return (
    testOperators2(result, concat, inputs.slice(1)) ||
    testOperators2(result, first + inputs[0], inputs.slice(1)) ||
    testOperators2(result, first * inputs[0], inputs.slice(1))
  );
}

await client.run([part1 as PartFn, part2 as PartFn], false);
