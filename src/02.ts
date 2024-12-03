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
    .map((report) => report.split(" ").map((level) => parseInt(level, 10)))
    .filter(
      (report) =>
        !!report.reduce((prev, curr) => {
          const diff = curr - prev;
          return diff >= 1 && diff <= 3 && prev !== 0 ? curr : 0;
        }) ||
        !!report.reduce((prev, curr) => {
          const diff = prev - curr;
          return diff >= 1 && diff <= 3 && prev !== 0 ? curr : 0;
        })
    ).length;
}

function part2(input: string) {
  return input
    .split("\n")
    .map((report) => report.split(" ").map((level) => parseInt(level, 10)))
    .filter((report) => {
      // console.log();
      // console.log(report);
      return checkSafety(report, 1, 3) || checkSafety(report, -3, -1);
    }).length;
}

function checkSafety(report: number[], min: number, max: number) {
  let safe = true;
  let dampener = true;

  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1];
    const prevDiff = report[i] - report[i - 2];
    const nextDiff = report[i + 1] - report[i - 1];
    const skipDiff = report[i + 1] - report[i];

    if (outside(diff, min, max)) {
      if (!dampener) {
        // console.log("second ❌", i, diff);
        safe = false;
        break;
      }

      if (between(nextDiff, min, max)) {
        i++;
        dampener = false;
      } else if (between(prevDiff, min, max)) {
        dampener = false;
      } else if (i === 1 && between(skipDiff, min, max)) {
        i++;
        dampener = false;
      } else if (i !== report.length - 1) {
        // console.log("impossible ❌", i, diff);
        safe = false;
        break;
      }
    }
  }

  return safe;
}

function outside(input: number, min: number, max: number) {
  return input < min || input > max;
}

function between(input: number, min: number, max: number) {
  return input >= min && input <= max;
}

await client.run([part1 as PartFn, part2 as PartFn], false);
