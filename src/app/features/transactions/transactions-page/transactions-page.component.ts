import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Transaction } from '../../../core/models/transaction';
import { TransactionRowComponent } from '../transaction-row/transaction-row.component';
import { TransactionFilterComponent } from '../transaction-filter/transaction-filter.component';
import { RouterLink, Router,NavigationEnd  } from '@angular/router';
import { filter } from 'rxjs/operators';

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

  constructor(@Inject(PLATFORM_ID) private platformId: object, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadFromStorage();
      });
  }

  ngOnInit(): void {
    // this.loadFromStorage();
  }

  loadFromStorage(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.transactions = [];
      return;
    }

    const raw = localStorage.getItem('transactions');

    if (!raw) {
      this.transactions = [];
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      this.transactions = Array.isArray(parsed) ? parsed : [];
    } catch {
      this.transactions = [];
    }
}


  // Hàm Delete
  onDelete(id: string): void {
    const ok = confirm('Delete this transaction?');
    if (!ok) return;

    this.transactions = this.transactions.filter(t => t.id !== id);

    // Chỉ lưu khi browser
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }
  }

  // Hàm Edit sau khi gọi Router ở constructor
  onEdit(id: string) {
    this.router.navigate(['/transactions', id, 'edit']);
  }
  
  //Filter của Transaction
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
