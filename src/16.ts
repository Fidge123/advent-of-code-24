import { AocClient } from "advent-of-code-client";
import type { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2024,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

type NSEW = "N" | "S" | "E" | "W";

interface Location {
  row: number;
  col: number;
  dir: NSEW;
}

interface Tile {
  row: number;
  col: number;
  end: boolean;
  visited: {
    N: boolean;
    E: boolean;
    S: boolean;
    W: boolean;
  };
  prev: {
    N?: [number, number, NSEW];
    E?: [number, number, NSEW];
    S?: [number, number, NSEW];
    W?: [number, number, NSEW];
  };
  score: {
    N: number;
    E: number;
    S: number;
    W: number;
  };
}

function part1(input: string) {
  const rawMap = input.split("\n").map((row) => row.split(""));
  const map = rawMap
    .map((row, i) =>
      row
        .map((tile, j) => ({
          wall: tile === "#",
          row: i,
          col: j,
          end: tile === "E",
          visited: {
            N: false,
            E: false,
            S: false,
            W: false,
          },
          prev: {
            N: undefined,
            E: undefined,
            S: undefined,
            W: undefined,
          },
          score: {
            N: Infinity,
            E: tile === "S" ? 0 : Infinity,
            S: Infinity,
            W: Infinity,
          },
        }))
        .filter((tile) => !tile.wall)
    )
    .flat();
  const start = {
    row: rawMap.findIndex((row) => row.includes("S")),
    col: rawMap.reduce((index, row) => Math.max(index, row.indexOf("S")), -1),
    dir: "E",
  } as Location;

  return dijkstra(map);
}

function dijkstra(map: Tile[]) {
  while (
    map.some((tile) => Object.values(tile.visited).some((v) => v === false))
  ) {
    const next = map
      .flatMap((t) =>
        (["N", "S", "E", "W"] as NSEW[]).map((dir) => ({
          row: t.row,
          col: t.col,
          dir,
          visited: t.visited[dir],
          score: t.score[dir],
        }))
      )
      .filter((t) => !t.visited)
      .sort((a, b) => a.score - b.score)[0] as Location;
    for (const n of getNeighbors(next)) {
      const tile = map.find((tile) => tile.row === n.row && tile.col === n.col);
      if (tile) {
        const prev = map.find(
          (tile) => tile.row === n.prev[0] && tile.col === n.prev[1]
        );
        tile.prev[n.dir] = n.prev as [number, number, NSEW];
        tile.score[n.dir] = Math.min(
          n.cost + (prev?.score[n.prev[2] as NSEW] ?? 0),
          tile.score[n.dir]
        );
        if (tile.end) {
          return Math.min(...Object.values(tile?.score ?? {}));
        }
      }
    }
    const tile = map.find(
      (tile) => tile.row === next.row && tile.col === next.col
    )!;
    tile.visited[next.dir] = true;
  }
  const end = map.find((tile) => tile.end);
  return Math.min(...Object.values(end?.score ?? {}));
}

function getNeighbors(location: Location) {
  const directions = {
    N: ["W", "E", -1, 0] as [NSEW, NSEW, number, number],
    E: ["N", "S", 0, 1] as [NSEW, NSEW, number, number],
    S: ["E", "W", 1, 0] as [NSEW, NSEW, number, number],
    W: ["S", "N", 0, -1] as [NSEW, NSEW, number, number],
  };
  return [
    {
      row: location.row,
      col: location.col,
      dir: directions[location.dir][0],
      prev: [location.row, location.col, location.dir],
      cost: 1000,
    },
    {
      row: location.row,
      col: location.col,
      dir: directions[location.dir][1],
      prev: [location.row, location.col, location.dir],
      cost: 1000,
    },
    {
      row: location.row + directions[location.dir][2],
      col: location.col + directions[location.dir][3],
      dir: location.dir,
      prev: [location.row, location.col, location.dir],
      cost: 1,
    },
  ];
}

function part2(input: string) {}

console.log(
  part1(`###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`)
);

console.log(
  part1(`#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`)
);

await client.run([part1 as PartFn, part2 as PartFn], false);
