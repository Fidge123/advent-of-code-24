import { AocClient } from "advent-of-code-client";
import type { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2024,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function part1(input: string) {
  let sum = 0;
  for (const result of input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/gm)) {
    sum += parseInt(result[1]) * parseInt(result[2]);
  }
  return sum;
}

function part2(input: string) {
  return input
    .replaceAll("\n", "")
    .split(/don't\(\).*?do\(\)/gm)
    .reduce(
      (sum, enabledSection, i, l) =>
        sum +
        part1(
          i === l.length - 1
            ? enabledSection.split("don't()")[0]
            : enabledSection
        ),
      0
    );
}

await client.run([part1 as PartFn, part2 as PartFn], false);
