export interface Bank {
  name: string;
  individualName: string;
  monthlyBalances: { [key: string]: Year };
}

export interface Year {
  months: Months;
}
export type Months = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

export type SortedYears = { year: string; months: Months }[];
