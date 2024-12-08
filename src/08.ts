import { AocClient } from "advent-of-code-client";
import type { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2024,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

type Antennas = Dict<[number, number][]>;

function getAntennas(map: string[][]) {
  const antennas = {} as Antennas;

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const tile = map[row][col];
      if (tile !== ".") {
        if (antennas[tile] === undefined) {
          antennas[tile] = [];
        }
        antennas[tile].push([row, col]);
      }
    }
  }
  return antennas;
}

function part1(input: string) {
  const map = input.split("\n").map((row) => row.split(""));
  const antennas = getAntennas(map);
  const antinodes = new Set<string>();

  for (const frequency in antennas) {
    if (antennas[frequency]) {
      for (const antenna of antennas[frequency]) {
        for (const pair of antennas[frequency]) {
          const location = [
            antenna[0] + (antenna[0] - pair[0]),
            antenna[1] + (antenna[1] - pair[1]),
          ];
          if (
            antenna !== pair &&
            location[0] >= 0 &&
            location[1] >= 0 &&
            location[0] < map.length &&
            location[1] < map[0].length
          ) {
            antinodes.add(JSON.stringify(location));
          }
        }
      }
    }
  }
  return antinodes.size;
}

function part2(input: string) {
  const map = input.split("\n").map((row) => row.split(""));
  const antennas = getAntennas(map);
  const antinodes = new Set<string>();

  for (const frequency in antennas) {
    if (antennas[frequency]) {
      for (const antenna of antennas[frequency]) {
        for (const pair of antennas[frequency]) {
          const diff = [antenna[0] - pair[0], antenna[1] - pair[1]];
          let location = [antenna[0], antenna[1]];

          if (antenna !== pair) {
            while (
              location[0] >= 0 &&
              location[1] >= 0 &&
              location[0] < map.length &&
              location[1] < map[0].length
            ) {
              antinodes.add(JSON.stringify(location));
              location = [location[0] + diff[0], location[1] + diff[1]];
            }
          }
        }
      }
    }
  }
  return antinodes.size;
}

await client.run([part1 as PartFn, part2 as PartFn], false);
