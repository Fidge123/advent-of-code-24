import { AocClient } from "advent-of-code-client";
import type { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2024,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function part1(input: string) {
  let xmasCount = 0;
  const wordSearch = input.split("\n");
  for (let line = 0; line < wordSearch.length; line++) {
    for (let char = 0; char < wordSearch[line].length; char++) {
      xmasCount += countXmas(wordSearch, line, char);
    }
  }
  return xmasCount;
}

function countXmas(input: string[], line: number, char: number): number {
  let count = 0;
  if (input[line][char] === "X") {
    checkDirection(input, line, 1, char, 0); // south
    checkDirection(input, line, -1, char, 0); // north
    checkDirection(input, line, 0, char, 1); // east
    checkDirection(input, line, 0, char, -1); // west
    checkDirection(input, line, 1, char, 1); // SE
    checkDirection(input, line, 1, char, -1); // SW
    checkDirection(input, line, -1, char, 1); // NE
    checkDirection(input, line, -1, char, -1); // NW
  }
  return count;
}

function checkDirection(
  input: string[],
  line: number,
  lineMultiplier: number,
  char: number,
  charMultiplier: number
): number {
  const hasXmas =
    input[line + 1 * lineMultiplier]?.[char + 1 * charMultiplier] === "M" &&
    input[line + 2 * lineMultiplier]?.[char + 2 * charMultiplier] === "A" &&
    input[line + 3 * lineMultiplier]?.[char + 3 * charMultiplier] === "S";
  return hasXmas ? 1 : 0;
}

function part2(input: string) {
  let masCount = 0;
  const wordSearch = input.split("\n");
  for (let line = 0; line < wordSearch.length; line++) {
    for (let char = 0; char < wordSearch[line].length; char++) {
      masCount += countMas(wordSearch, line, char);
    }
  }
  return masCount;
}

function countMas(input: string[], line: number, char: number): number {
  let count = 0;
  if (input[line][char] === "A") {
    if (
      input[line + 1]?.[char + 1] === "M" &&
      input[line + 1]?.[char - 1] === "M" &&
      input[line - 1]?.[char + 1] === "S" &&
      input[line - 1]?.[char - 1] === "S"
    ) {
      count += 1;
    }
    if (
      input[line - 1]?.[char + 1] === "M" &&
      input[line - 1]?.[char - 1] === "M" &&
      input[line + 1]?.[char + 1] === "S" &&
      input[line + 1]?.[char - 1] === "S"
    ) {
      count += 1;
    }
    if (
      input[line + 1]?.[char - 1] === "M" &&
      input[line - 1]?.[char - 1] === "M" &&
      input[line + 1]?.[char + 1] === "S" &&
      input[line - 1]?.[char + 1] === "S"
    ) {
      count += 1;
    }
    if (
      input[line + 1]?.[char + 1] === "M" &&
      input[line - 1]?.[char + 1] === "M" &&
      input[line + 1]?.[char - 1] === "S" &&
      input[line - 1]?.[char - 1] === "S"
    ) {
      count += 1;
    }
  }
  return count;
}

await client.run([part1 as PartFn, part2 as PartFn], false);
