import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Transaction } from '../../../core/models/transaction';
import { TransactionRowComponent } from '../transaction-row/transaction-row.component';
import { TransactionFilterComponent } from '../transaction-filter/transaction-filter.component';
import { RouterLink } from '@angular/router';

type FilterType = 'all' | 'income' | 'expense';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [CommonModule, TransactionRowComponent, TransactionFilterComponent, RouterLink],
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.css'],
})
export class TransactionsPageComponent implements OnInit {
  transactions: Transaction[] = [];
  selectedType: FilterType = 'all';

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.loadFromStorage();
  }

  loadFromStorage(): void {
    // Chỉ chạy localStorage ở browser
    if (!isPlatformBrowser(this.platformId)) {
      // SSR/Node: không có localStorage -> chỉ để mock tạm
      this.transactions = [
        { id: 't1', date: '2026-01-19', amount: 50000, type: 'expense', category: 'Eat and Drink', note: 'Cafe' },
        { id: 't2', date: '2026-01-18', amount: 120000, type: 'expense', category: 'Transport', note: 'Grab' },
        { id: 't3', date: '2026-01-17', amount: 2000000, type: 'income', category: 'Salary', note: 'January' },
      ];
      return;
    }

    const raw = localStorage.getItem('transactions');

    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        this.transactions = Array.isArray(parsed) ? (parsed as Transaction[]) : [];
        return;
      } catch {
        // nếu JSON lỗi thì rơi xuống dưới để reset
      }
    }

    // Nếu chưa có hoặc dữ liệu hỏng thì đẩy mock data vào
    this.transactions = [
      { id: 't1', date: '2026-01-19', amount: 45000, type: 'expense', category: 'Eat and Drink', note: 'Cafe' },
      { id: 't2', date: '2026-01-18', amount: 120000, type: 'expense', category: 'Transport', note: 'Grab' },
      { id: 't3', date: '2026-01-17', amount: 2000000, type: 'income', category: 'Salary', note: 'January' },
    ];

    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }

  get filteredTransactions(): Transaction[] {
    if (this.selectedType === 'all') return this.transactions;
    return this.transactions.filter(t => t.type === this.selectedType);
  }

  onTypeChange(type: FilterType) {
    this.selectedType = type;
  }

  trackById(_: number, t: Transaction) {
    return t.id;
  }
}
