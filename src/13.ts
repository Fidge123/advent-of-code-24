import { AocClient } from "advent-of-code-client";
import type { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2024,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function part1(input: string) {
  const games = input.split("\n\n");
  let tokens = 0;
  for (const game of games) {
    const [buttonA, buttonB, prize] = game.split("\n").map((line) =>
      line
        .match(/X[+=](\d+), Y[+=](\d+)/)!
        .slice(1, 3)
        .map((dist) => parseInt(dist))
    );
    const [a, b] = solve(
      [buttonA[0], buttonB[0], prize[0]],
      [buttonA[1], buttonB[1], prize[1]]
    ) ?? [0, 0];

    tokens += 3 * a + b;
  }

  return tokens;
}

type Equation = [number, number, number];
type Solution = [number, number];

function solve(eq1: Equation, eq2: Equation): Solution | undefined {
  eq1 = eq1.map((num, i) => num - eq2[i] * (eq1[0] / eq2[0])) as Equation;
  eq1 = eq1.map((num) =>
    parseFloat((num / eq1[1]).toPrecision(14))
  ) as Equation;

  const solution = [(eq2[2] - eq2[1] * eq1[2]) / eq2[0], eq1[2]];
  if (solution.map((x) => Number.isInteger(x)).every((x) => x)) {
    return solution as Solution;
  }
}

function part2(input: string) {
  const games = input.split("\n\n");
  let tokens = 0;
  for (const game of games) {
    const [buttonA, buttonB, prize] = game.split("\n").map((line) =>
      line
        .match(/X[+=](\d+), Y[+=](\d+)/)!
        .slice(1, 3)
        .map((dist) => parseInt(dist))
    );
    const [a, b] = solve(
      [buttonA[0], buttonB[0], prize[0] + 10000000000000],
      [buttonA[1], buttonB[1], prize[1] + 10000000000000]
    ) ?? [0, 0];

    tokens += 3 * a + b;
  }

  return tokens;
}

await client.run([part1 as PartFn, part2 as PartFn], false);
