import { AocClient } from "advent-of-code-client";
import type { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2024,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

type Coordinates = [number, number];
type Region = Coordinates[];
type RegionsList = Region[];

function part1(input: string) {
  const map = input.split("\n").map((row) => row.split(""));
  const regions = getRegions(map);
  // for (const region of regions) {
  //   const [x, y] = region[0];
  //   console.log(map[x][y], JSON.stringify(region));
  // }

  return regions.reduce((sum, region) => sum + getPrice(region, false), 0);
}

function getRegions(map: string[][]): RegionsList {
  const regions = [] as RegionsList;
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const plant = map[row][col];

      const above = regions.findIndex((region) =>
        region.some(
          ([r, c]) => map[r][c] === plant && r + 1 === row && c === col
        )
      );
      const before = regions.findIndex((region) =>
        region.some(
          ([r, c]) => map[r][c] === plant && r === row && c + 1 === col
        )
      );
      if (above >= 0 && before >= 0 && above !== before) {
        const a = regions.splice(Math.max(above, before), 1);
        const b = regions.splice(Math.min(above, before), 1);
        regions.push([[row, col], ...a[0], ...b[0]]);
      } else if (above >= 0 || before >= 0) {
        regions[Math.max(above, before)].push([row, col]);
      } else {
        regions.push([[row, col]]);
      }
    }
  }
  return regions;
}

function isNextTo(a: Coordinates, b: Coordinates) {
  if (a[0] === b[0]) {
    return Math.abs(a[1] - b[1]) === 1;
  }
  if (a[1] === b[1]) {
    return Math.abs(a[0] - b[0]) === 1;
  }
  return false;
}

function getPrice(region: Region, applyDiscount: boolean): number {
  const area = region.length;
  let perimeter = 0;

  for (const plot of region) {
    perimeter += 4 - region.filter((p) => isNextTo(plot, p)).length;
  }
  return area * (applyDiscount ? getDiscount(region) : perimeter);
}

function part2(input: string) {
  const map = input.split("\n").map((row) => row.split(""));
  const regions = getRegions(map);

  return regions.reduce((sum, region) => sum + getPrice(region, true), 0);
}

function getDiscount(region: Region): number {
  const sides = [] as string[];

  for (const plot of region) {
    const adjacent = region.filter(r => isNextTo(r, plot));
    const [left, right, top, bottom] = [
      `c${plot[1]}`,
      `c${plot[1] + 1}`,
      `r${plot[0]}`,
      `r${plot[0] + 1}`,
    ];
    if (!sides.includes(left)) {
      if (!adjacent.filter())
    }
    sides.push(plot[0])
  }
  return sides;
}

console.log(
  part2(`RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`)
);

await client.run([part1 as PartFn, part2 as PartFn], false);
