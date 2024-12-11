import { AocClient } from "advent-of-code-client";
import type { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2024,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function blink(repeats: number, stones: number[]) {
  let simpleStones = deduplicate(stones.map((stone) => [stone, 1]));

  for (let i = 0; i < repeats; i++) {
    simpleStones = deduplicate(
      simpleStones.flatMap((stone) => transform(stone))
    );
  }

  return simpleStones.reduce((sum, [_, multi]) => sum + multi, 0);
}

function deduplicate(stones: [number, number][]) {
  const deduped = [] as [number, number][];
  for (const [stone, multi] of stones) {
    const index = deduped.findIndex(([s]) => s === stone);
    if (index === -1) {
      deduped.push([stone, multi]);
    } else {
      deduped[index][1] += multi;
    }
  }
  return deduped;
}

function transform([stone, multi]: [number, number]): [number, number][] {
  const digits = stone.toString().length;
  if (stone === 0) {
    return [[1, multi]];
  } else if (digits % 2 === 0) {
    const left = Math.floor(stone / Math.pow(10, digits / 2));
    return [
      [left, multi],
      [stone % Math.pow(10, digits / 2), multi],
    ];
  } else {
    return [[stone * 2024, multi]];
  }
}

function part1(input: string) {
  let stones = input.split(" ").map((stone) => parseInt(stone));
  return blink(25, stones);
}

function part2(input: string) {
  let stones = input.split(" ").map((stone) => parseInt(stone));
  return blink(75, stones);
}

await client.run([part1 as PartFn, part2 as PartFn], false);
