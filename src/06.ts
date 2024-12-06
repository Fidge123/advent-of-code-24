import { AocClient } from "advent-of-code-client";
import type { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2024,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function part1(input: string) {
  return watchGuard(input.split("\n").map((row) => row.split(""))).size;
}

function part2(input: string) {
  const map = input.split("\n").map((row) => row.split(""));
  const initialGuard = initGuard(map);
  const initialPositions = watchGuard(map);
  let loopCount = 0;

  for (const pos of initialPositions) {
    if (pos === JSON.stringify(initialGuard)) {
      continue;
    }
    const block = JSON.parse(pos);
    const blockedMap = input.split("\n").map((row) => row.split(""));
    blockedMap[block[0]][block[1]] = "#";
    if (watchGuard(blockedMap).size === 0) {
      loopCount += 1;
    }
  }

  return loopCount;
}

function initGuard(map: string[][]) {
  return [
    map.findIndex((row) => row.includes("^")),
    map.reduce((col, row) => Math.max(col, row.indexOf("^")), 0),
  ];
}

function watchGuard(map: string[][]): Set<string> {
  let guard = initGuard(map);
  let direction = 0;
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const visited = new Set([JSON.stringify(guard)]);
  const visitedDirection = new Set([`${guard[0]}-${guard[1]}-${direction}`]);

  while (
    between(guard[0] + directions[direction][0], 0, map.length) &&
    between(guard[1] + directions[direction][1], 0, map[0].length)
  ) {
    const nextPosition = [
      guard[0] + directions[direction][0],
      guard[1] + directions[direction][1],
    ];
    if (
      visitedDirection.has(`${nextPosition[0]}-${nextPosition[1]}-${direction}`)
    ) {
      return new Set();
    }
    if (map[nextPosition[0]][nextPosition[1]] === "#") {
      direction = (direction + 1) % 4;
    }
    if ([".", "^"].includes(map[nextPosition[0]][nextPosition[1]])) {
      guard = nextPosition;
      visited.add(JSON.stringify(guard));
      visitedDirection.add(`${guard[0]}-${guard[1]}-${direction}`);
    }
  }
  return visited;
}

function between(input: number, min: number, max: number) {
  return input >= min && input < max;
}

await client.run([part1 as PartFn, part2 as PartFn], false);
