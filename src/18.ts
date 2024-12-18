import { AocClient } from "advent-of-code-client";
import type { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2024,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function part1(input: string) {
  const bytes = input
    .split("\n")
    .map((byte) => byte.split(",").map((b) => parseInt(b)));
  const blocked = bytes.slice(0, bytes.length > 1000 ? 1024 : 12);

  const start = [0, 0] as [number, number];
  const exit = (bytes.length > 1000 ? [70, 70] : [6, 6]) as [number, number];

  return djikstra(blocked, start, exit);
}

function djikstra(
  blocked: number[][],
  start: [number, number],
  exit: [number, number]
): number {
  const grid = Array(exit[1] + 1)
    .fill(0)
    .map(() => Array(exit[0] + 1).fill(true));

  for (const [x, y] of blocked) {
    grid[y][x] = false;
  }

  const distances = Array(exit[1] + 1)
    .fill(0)
    .map(() => Array(exit[0] + 1).fill(Infinity));
  distances[start[1]][start[0]] = 0;

  const queue = [[start[0], start[1], 0]];
  const seen = new Set();

  while (queue.length > 0) {
    queue.sort((a, b) => b[2] - a[2]);
    const [x, y, dist] = queue.pop()!;

    if (x === exit[0] && y === exit[1]) {
      return dist;
    }

    const key = `${x},${y}`;
    if (!seen.has(key)) {
      seen.add(key);
      for (const [dx, dy] of [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
      ]) {
        const nx = x + dx;
        const ny = y + dy;

        if (grid[ny]?.[nx]) {
          const newDist = dist + 1;
          if (newDist < distances[ny][nx]) {
            distances[ny][nx] = newDist;
            queue.push([nx, ny, newDist]);
          }
        }
      }
    }
  }

  return -1; // No path found
}

function part2(input: string) {
  const bytes = input
    .split("\n")
    .map((byte) => byte.split(",").map((b) => parseInt(b)));

  const start = [0, 0] as [number, number];
  const exit = (bytes.length > 1000 ? [70, 70] : [6, 6]) as [number, number];

  for (let i = bytes.length > 1000 ? 1024 : 12; i < bytes.length; i++) {
    if (djikstra(bytes.slice(0, i), start, exit) === -1) {
      return bytes[i - 1].join(",");
    }
  }
  return -1;
}

await client.run([part1 as PartFn, part2 as PartFn], false);
