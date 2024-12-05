import { AocClient } from "advent-of-code-client";
import type { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2024,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

type Rules = Dict<number[]>;

function part1(input: string) {
  const [ruleStatements, prints] = input
    .split("\n\n")
    .map((section) => section.split("\n"));

  const rules = getRules(ruleStatements);

  return prints
    .map((print) => print.split(",").map((page) => parseInt(page)))
    .reduce(
      (sum, pages) =>
        sum +
        (checkPrint(pages, rules) ? pages[Math.floor(pages.length / 2)] : 0),
      0
    );
}

function part2(input: string) {
  const [ruleStatements, prints] = input
    .split("\n\n")
    .map((section) => section.split("\n"));

  const rules = getRules(ruleStatements);
  const wrong = prints
    .map((print) => print.split(",").map((page) => parseInt(page)))
    .filter((pages) => !checkPrint(pages, rules));

  return wrong.reduce(
    (sum, pages) =>
      sum + correctPrint(pages, rules)[Math.floor(pages.length / 2)],
    0
  );
}

function getRules(ruleStatements: string[]): Rules {
  return ruleStatements
    .map((statement) => statement.split("|").map((page) => parseInt(page)))
    .reduce((rules, [page1, page2]) => {
      if (rules[page1]) {
        rules[page1].push(page2);
      } else {
        rules[page1] = [page2];
      }
      return rules;
    }, {} as Rules);
}

function checkPrint(pages: number[], rules: Rules): boolean {
  const previousPages = [] as number[];

  for (const page of pages) {
    if (previousPages.some((prev) => rules[page]?.includes(prev))) {
      return false;
    }
    previousPages.push(page);
  }
  return true;
}

function correctPrint(pages: number[], rules: Rules): number[] {
  return pages.sort((a, b) => {
    if (rules[a]?.includes(b)) {
      return -1;
    }
    if (rules[b]?.includes(a)) {
      return 1;
    }
    return pages.indexOf(a) - pages.indexOf(b);
  });
}

await client.run([part1 as PartFn, part2 as PartFn], false);
