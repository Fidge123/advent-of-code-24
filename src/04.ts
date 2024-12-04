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
    if (input[line + 1]?.[char] === "M") {
      if (input[line + 2]?.[char] === "A") {
        if (input[line + 3]?.[char] === "S") {
          console.log(
            `Found XMAS at line ${line + 1} char ${char + 1} going south.`
          );
          count += 1;
        }
      }
    }
    if (input[line - 1]?.[char] === "M") {
      if (input[line - 2]?.[char] === "A") {
        if (input[line - 3]?.[char] === "S") {
          console.log(
            `Found XMAS at line ${line + 1} char ${char + 1} going north.`
          );
          count += 1;
        }
      }
    }
    if (input[line + 1]?.[char + 1] === "M") {
      if (input[line + 2]?.[char + 2] === "A") {
        if (input[line + 3]?.[char + 3] === "S") {
          console.log(
            `Found XMAS at line ${line + 1} char ${char + 1} going south east.`
          );
          count += 1;
        }
      }
    }
    if (input[line + 1]?.[char - 1] === "M") {
      if (input[line + 2]?.[char - 2] === "A") {
        if (input[line + 3]?.[char - 3] === "S") {
          console.log(
            `Found XMAS at line ${line + 1} char ${char + 1} going south west.`
          );
          count += 1;
        }
      }
    }
    if (input[line - 1]?.[char + 1] === "M") {
      if (input[line - 2]?.[char + 2] === "A") {
        if (input[line - 3]?.[char + 3] === "S") {
          console.log(
            `Found XMAS at line ${line + 1} char ${char + 1} going north east.`
          );
          count += 1;
        }
      }
    }
    if (input[line - 1]?.[char - 1] === "M") {
      if (input[line - 2]?.[char - 2] === "A") {
        if (input[line - 3]?.[char - 3] === "S") {
          console.log(
            `Found XMAS at line ${line + 1} char ${char + 1} going north west.`
          );
          count += 1;
        }
      }
    }
    if (input[line]?.[char + 1] === "M") {
      if (input[line]?.[char + 2] === "A") {
        if (input[line]?.[char + 3] === "S") {
          console.log(
            `Found XMAS at line ${line + 1} char ${char + 1} going east.`
          );
          count += 1;
        }
      }
    }
    if (input[line]?.[char - 1] === "M") {
      if (input[line]?.[char - 2] === "A") {
        if (input[line]?.[char - 3] === "S") {
          console.log(
            `Found XMAS at line ${line + 1} char ${char + 1} going west.`
          );
          count += 1;
        }
      }
    }
  }
  return count;
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
      console.log(
        `Found X-MAS at line ${line + 1} char ${char + 1} facing south.`
      );
      count += 1;
    }
    if (
      input[line - 1]?.[char + 1] === "M" &&
      input[line - 1]?.[char - 1] === "M" &&
      input[line + 1]?.[char + 1] === "S" &&
      input[line + 1]?.[char - 1] === "S"
    ) {
      console.log(
        `Found X-MAS at line ${line + 1} char ${char + 1} facing north.`
      );
      count += 1;
    }
    if (
      input[line + 1]?.[char - 1] === "M" &&
      input[line - 1]?.[char - 1] === "M" &&
      input[line + 1]?.[char + 1] === "S" &&
      input[line - 1]?.[char + 1] === "S"
    ) {
      console.log(
        `Found X-MAS at line ${line + 1} char ${char + 1} facing west.`
      );
      count += 1;
    }
    if (
      input[line + 1]?.[char + 1] === "M" &&
      input[line - 1]?.[char + 1] === "M" &&
      input[line + 1]?.[char - 1] === "S" &&
      input[line - 1]?.[char - 1] === "S"
    ) {
      console.log(
        `Found X-MAS at line ${line + 1} char ${char + 1} facing east.`
      );
      count += 1;
    }
  }
  return count;
}

await client.run([part1 as PartFn, part2 as PartFn], false);
