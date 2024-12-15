import { AocClient } from "advent-of-code-client";
import type { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2024,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

type Location = [number, number];

interface Robot {
  location: Location;
  velocity: [number, number];
}

function part1(input: string) {
  const map = (input.length < 200 ? [11, 7] : [101, 103]) as Location;
  const robots = input
    .split("\n")
    .map((robot) =>
      robot
        .split(" ")
        .map((e) =>
          e.split(",").map((num, i) => parseInt(i === 0 ? num.slice(2) : num))
        )
    )
    .map(([location, velocity]) => ({ location, velocity })) as Robot[];

  return getSafetyFactor(simulate(robots, map, 100), map);
}

function simulate(robots: Robot[], map: Location, seconds: number) {
  return robots.map(
    ({ location, velocity }) =>
      [
        (((location[0] + velocity[0] * seconds) % map[0]) + map[0]) % map[0],
        (((location[1] + velocity[1] * seconds) % map[1]) + map[1]) % map[1],
      ] as Location
  );
}

function getSafetyFactor(locations: Location[], map: Location) {
  console.log(JSON.stringify(locations));
  return (
    locations.filter(
      ([x, y]) => x < Math.floor(map[0] / 2) && y < Math.floor(map[1] / 2)
    ).length * // top left
    locations.filter(
      ([x, y]) => x > Math.floor(map[0] / 2) && y < Math.floor(map[1] / 2)
    ).length * // top right
    locations.filter(
      ([x, y]) => x < Math.floor(map[0] / 2) && y > Math.floor(map[1] / 2)
    ).length * // bottom left
    locations.filter(
      ([x, y]) => x > Math.floor(map[0] / 2) && y > Math.floor(map[1] / 2)
    ).length // bottom right
  );
}

function draw(locations: Location[], map: Location) {
  let drawing = "";

  for (let y = 0; y < map[1]; y++) {
    for (let x = 0; x < map[0]; x++) {
      const count = locations.filter(([lx, ly]) => lx === x && ly === y).length;
      drawing += count === 0 ? " " : count.toString();
    }
    drawing += "\n";
  }
  console.log(drawing);
}

function part2(input: string) {
  const map = (input.length < 200 ? [11, 7] : [101, 103]) as Location;
  const robots = input
    .split("\n")
    .map((robot) =>
      robot
        .split(" ")
        .map((e) =>
          e.split(",").map((num, i) => parseInt(i === 0 ? num.slice(2) : num))
        )
    )
    .map(([location, velocity]) => ({ location, velocity })) as Robot[];

  for (let i = 3500; i < 10500; i++) {
    console.log();
    console.log("Robots after", i, "seconds:");
    draw(simulate(robots, map, i), map);
  }
}

await client.run([part1 as PartFn, part2 as PartFn], false);
