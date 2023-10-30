export interface Bank {
  name: string;
  individualName: string;
  monthlyBalances?: { [key: string]: number }[];
}
