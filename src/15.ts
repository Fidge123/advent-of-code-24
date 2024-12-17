import { AocClient } from "advent-of-code-client";
import type { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2024,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function parseMoves(moveInput: string): string[] {
  return moveInput.replace("\n", "").split("");
}

function parseMap(mapInput: string) {
  const parsedMap = mapInput.split("\n").map((row) => row.split(""));
  const walls = [] as [number, number][];
  const boxes = [] as [number, number][];
  const robot = [] as number[];

  for (let row = 0; row < parsedMap.length; row++) {
    for (let col = 0; col < parsedMap[row].length; col++) {
      if (parsedMap[row][col] === "O") {
        boxes.push([row, col]);
      }
      if (parsedMap[row][col] === "#") {
        walls.push([row, col]);
      }
      if (parsedMap[row][col] === "@") {
        robot.push(row);
        robot.push(col);
      }
    }
  }
  return [walls, boxes, robot] as [
    [number, number][],
    [number, number][],
    number[]
  ];
}

function run(
  moves: string[],
  [walls, boxes, robot]: [[number, number][], [number, number][], number[]]
) {
  for (const move of moves) {
    // console.log(JSON.stringify(boxes));
    // console.log(move, robot);
    if (move === "^") {
      const wall = walls.findLast(
        (wall) => wall[1] === robot[1] && wall[0] < robot[0]
      )!;
      const relevantBoxes = boxes.filter(
        (box) => box[1] === robot[1] && box[0] < robot[0] && box[0] > wall[0]
      );
      if (robot[0] - wall[0] - 1 > relevantBoxes.length) {
        robot[0] -= 1;
        let push = robot[0];
        for (let i = 0; i < relevantBoxes.length; i++) {
          const box = relevantBoxes.filter((box) => box[0] === push);
          if (i === 0 ? box.length === 1 : box.length === 2) {
            box[0][0] -= 1;
            push -= 1;
          }
        }
      }
    }
    if (move === "v") {
      const wall = walls.find(
        (wall) => wall[1] === robot[1] && wall[0] > robot[0]
      )!;
      const relevantBoxes = boxes.filter(
        (box) => box[1] === robot[1] && box[0] > robot[0] && box[0] < wall[0]
      );
      if (wall[0] - robot[0] - 1 > relevantBoxes.length) {
        robot[0] += 1;
        let push = robot[0];
        for (let i = 0; i < relevantBoxes.length; i++) {
          const box = relevantBoxes.filter((box) => box[0] === push);
          if (i === 0 ? box.length === 1 : box.length === 2) {
            box[0][0] += 1;
            push += 1;
          }
        }
      }
    }
    if (move === "<") {
      const wall = walls.findLast(
        (wall) => wall[0] === robot[0] && wall[1] < robot[1]
      )!;
      const relevantBoxes = boxes.filter(
        (box) => box[0] === robot[0] && box[1] < robot[1] && box[1] > wall[1]
      );
      if (robot[1] - wall[1] - 1 > relevantBoxes.length) {
        robot[1] -= 1;
        let push = robot[1];
        for (let i = 0; i < relevantBoxes.length; i++) {
          const box = relevantBoxes.filter((box) => box[1] === push);
          if (i === 0 ? box.length === 1 : box.length === 2) {
            box[0][1] -= 1;
            push -= 1;
          }
        }
      }
    }
    if (move === ">") {
      const wall = walls.find(
        (wall) => wall[0] === robot[0] && wall[1] > robot[1]
      )!;
      const relevantBoxes = boxes.filter(
        (box) => box[0] === robot[0] && box[1] > robot[1] && box[1] < wall[1]
      );
      if (wall[1] - robot[1] - 1 > relevantBoxes.length) {
        robot[1] += 1;
        let push = robot[1];
        for (let i = 0; i < relevantBoxes.length; i++) {
          const box = relevantBoxes.filter((box) => box[1] === push);
          if (i === 0 ? box.length === 1 : box.length === 2) {
            box[0][1] += 1;
            push += 1;
          }
        }
      }
    }
  }
  console.log(JSON.stringify(boxes));
  console.log(getGPS(boxes) < 1395775);
  return getGPS(boxes);
}

function getGPS(boxes: [number, number][]) {
  return boxes.reduce((sum, [row, col]) => sum + row * 100 + col, 0);
}

function part1(input: string) {
  const [mapInput, moveInput] = input.split("\n\n");
  const map = parseMap(mapInput);
  const moves = parseMoves(moveInput);

  return run(moves, map);
}

function part2(input: string) {}

await client.run([part1 as PartFn, part2 as PartFn], false);
