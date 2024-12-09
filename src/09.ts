import { AocClient } from "advent-of-code-client";
import type { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2024,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function part1(input: string) {
  return getChecksum(
    defrag(
      parse(input).reduce((fs, file, i) => {
        for (let j = 0; j < file; j++) {
          fs.push(i % 2 === 0 ? i / 2 : -1);
        }
        return fs;
      }, [] as number[])
    )
  );
}

function defrag(fs: number[]) {
  for (let i = fs.length - 1; i >= 0; i--) {
    const firstFree = fs.indexOf(-1);
    if (i < firstFree || firstFree === -1) {
      return fs;
    }
    if (fs[i] !== -1) {
      fs[firstFree] = fs[i];
      fs[i] = -1;
    }
    // console.log(fs, i, firstFree);
  }
  return fs;
}

function parse(fs: string) {
  return fs.split("").map((file) => parseInt(file));
}

function getChecksum(fs: number[]) {
  return fs.reduce(
    (checksum, file, i) => (file === -1 ? checksum : checksum + file * i),
    0
  );
}

interface File {
  id: number;
  size: number;
}

function part2(input: string) {
  return getChecksum(
    defrag2(
      parse(input).reduce((fs, file, i) => {
        fs.push({
          size: file,
          id: i % 2 === 0 ? i / 2 : -1,
        });
        return fs;
      }, [] as File[])
    ).reduce((fs, file) => {
      for (let j = 0; j < file.size; j++) {
        fs.push(file.id);
      }
      return fs;
    }, [] as number[])
  );
}

function defrag2(fs: File[]) {
  for (let i = fs.length - 1; i >= 0; i--) {
    const firstFree = fs.findIndex(({ id }) => id === -1);
    if (i < firstFree || firstFree === -1) {
      return fs;
    }
    const firstFitting = fs.findIndex(
      ({ id, size }) => id === -1 && size >= fs[i].size
    );
    if (fs[i].id !== -1 && firstFitting < i && firstFitting !== -1) {
      const freeSpace = fs[firstFitting];
      const file = fs[i];
      if (freeSpace.size === file.size) {
        fs[firstFitting].id = fs[i].id;
        fs[i].id = -1;
      } else {
        fs = [
          ...fs.slice(0, firstFitting),
          file,
          { id: -1, size: freeSpace.size - file.size },
          ...fs.slice(firstFitting + 1, i),
          { id: -1, size: file.size },
          ...fs.slice(i + 1),
        ];
      }
    }
  }
  return fs;
}

await client.run([part1 as PartFn, part2 as PartFn], false);
