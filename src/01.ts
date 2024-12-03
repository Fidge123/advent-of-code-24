import { AocClient } from "advent-of-code-client";
import type { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2024,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function part1(input: string) {
  const leftList = input
    .split("\n")
    .map((line) => parseInt(line.split("   ")[0]))
    .sort((a, b) => a - b);
  const rightList = input
    .split("\n")
    .map((line) => parseInt(line.split("   ")[1]))
    .sort((a, b) => a - b);
  return leftList.reduce(
    (sum, location, index) => sum + Math.abs(location - rightList[index]),
    0
  );
}

function part2(input: string) {
  const leftList = input
    .split("\n")
    .map((line) => parseInt(line.split("   ")[0]));
  const rightList = input
    .split("\n")
    .map((line) => parseInt(line.split("   ")[1]));
  return leftList.reduce(
    (similarity, location) =>
      similarity +
      location * rightList.filter((loc) => loc === location).length,
    0
  );
}

await client.run([part1 as PartFn, part2 as PartFn], false);
