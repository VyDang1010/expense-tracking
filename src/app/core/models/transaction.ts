export interface Transaction {
  id: string;
  date: string; // ISO string: "2026-01-19"
  amount: number;
  type: 'income' | 'expense';
  category: string;
  note?: string;
}
