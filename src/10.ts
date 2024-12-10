import { AocClient } from "advent-of-code-client";
import type { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2024,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function part1(input: string) {
  const map = input
    .split("\n")
    .map((row) => row.split("").map((col) => parseInt(col)));
  return findTrailheads(map).reduce(
    (score, th) => score + getScore(th, map),
    0
  );
}

function findTrailheads(map: number[][]) {
  const trailheads = [] as [number, number][];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 0) {
        trailheads.push([i, j]);
      }
    }
  }
  return trailheads;
}

function getScore(head: [number, number], map: number[][]): number {
  return getTrails(head, new Set<string>(), map).size;
}

function getTrails(
  [row, col]: [number, number],
  trailEnd: Set<string>,
  map: number[][]
): Set<string> {
  let height = map[row][col];

  if (height === 9) {
    trailEnd.add(`${row}-${col}`);
  } else {
    if (map[row + 1]?.[col] === height + 1) {
      getTrails([row + 1, col], trailEnd, map);
    }
    if (map[row - 1]?.[col] === height + 1) {
      getTrails([row - 1, col], trailEnd, map);
    }
    if (map[row][col + 1] === height + 1) {
      getTrails([row, col + 1], trailEnd, map);
    }
    if (map[row][col - 1] === height + 1) {
      getTrails([row, col - 1], trailEnd, map);
    }
  }

  return trailEnd;
}

function part2(input: string) {
  const map = input
    .split("\n")
    .map((row) => row.split("").map((col) => parseInt(col)));
  return findTrailheads(map).reduce(
    (score, th) => score + getScore2(th, map),
    0
  );
}

function getScore2([row, col]: [number, number], map: number[][]): number {
  let height = map[row][col];
  let score = 0;

  if (height === 9) {
    return 1;
  } else {
    if (map[row + 1]?.[col] === height + 1) {
      score += getScore2([row + 1, col], map);
    }
    if (map[row - 1]?.[col] === height + 1) {
      score += getScore2([row - 1, col], map);
    }
    if (map[row][col + 1] === height + 1) {
      score += getScore2([row, col + 1], map);
    }
    if (map[row][col - 1] === height + 1) {
      score += getScore2([row, col - 1], map);
    }
  }

  return score;
}

console.log(
  part2(`89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`)
);

await client.run([part1 as PartFn, part2 as PartFn], false);
