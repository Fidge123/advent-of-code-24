import { AocClient } from "advent-of-code-client";
import type { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2024,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function parse(input: string) {
  const [registers, program] = input.split("\n\n");
  return [
    registers.split("\n").map((l) => parseInt(l.split(": ")[1])),
    program
      .split(": ")[1]
      .split(",")
      .map((num) => parseInt(num)),
  ];
}

function combo(operand: number, registers: number[]) {
  switch (operand) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 3;
    case 4:
      return registers[0];
    case 5:
      return registers[1];
    case 6:
      return registers[2];
    case 7:
    default:
      console.error("Invalid operand");
      return -1;
  }
}

function adv(operand: number, registers: number[]) {
  registers[0] = Math.trunc(
    registers[0] / Math.pow(2, combo(operand, registers))
  );
  registers[3] += 2;
}

function bxl(operand: number, registers: number[]) {
  registers[1] = registers[1] ^ operand;
  registers[3] += 2;
}

function bst(operand: number, registers: number[]) {
  registers[1] = combo(operand, registers) % 8;
  registers[3] += 2;
}

function jnz(operand: number, registers: number[]) {
  if (registers[0] !== 0) {
    registers[3] = operand;
  } else {
    registers[3] += 2;
  }
}

function bxc(operand: number, registers: number[]) {
  registers[1] = registers[1] ^ registers[2];
  registers[3] += 2;
}

function out(operand: number, registers: number[]) {
  registers.push(combo(operand, registers) % 8);
  registers[3] += 2;
}

function bdv(operand: number, registers: number[]) {
  registers[1] = Math.trunc(
    registers[0] / Math.pow(2, combo(operand, registers))
  );
  registers[3] += 2;
}

function cdv(operand: number, registers: number[]) {
  registers[2] = Math.trunc(
    registers[0] / Math.pow(2, combo(operand, registers))
  );
  registers[3] += 2;
}

function run(registers: number[], program: number[]) {
  registers[3] = 0;

  while (registers[3] < program.length) {
    switch (program[registers[3]]) {
      case 0:
        adv(program[registers[3] + 1], registers);
        break;
      case 1:
        bxl(program[registers[3] + 1], registers);
        break;
      case 2:
        bst(program[registers[3] + 1], registers);
        break;
      case 3:
        jnz(program[registers[3] + 1], registers);
        break;
      case 4:
        bxc(program[registers[3] + 1], registers);
        break;
      case 5:
        out(program[registers[3] + 1], registers);
        break;
      case 6:
        bdv(program[registers[3] + 1], registers);
        break;
      case 7:
        cdv(program[registers[3] + 1], registers);
        break;
      default:
        console.error("Invalid opcode");
    }
  }
  return registers.slice(4).join(",");
}

function part1(input: string) {
  const [registers, program] = parse(input);

  return run(registers, program);
}

function part2(input: string) {
  const [registers, program] = parse(input);

  // TODO reverse algorithm so output => input

  for (let i = 0; i < 1_000_000; i++) {
    if (i % 10_000 === 0) {
      console.log(i);
    }
    registers[0] = i;
    if (run(registers, program) === program.join(",")) {
      return i;
    }
  }

  return "ERROR";
}

console.log(
  part2(`Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`)
);

await client.run([part1 as PartFn, part2 as PartFn], false);
