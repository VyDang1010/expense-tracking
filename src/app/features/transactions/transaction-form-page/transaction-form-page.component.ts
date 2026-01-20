import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Transaction } from '../../../core/models/transaction';

@Component({
  selector: 'app-transaction-form-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './transaction-form-page.component.html',
  styleUrls: ['./transaction-form-page.component.css'],
})
export class TransactionFormPageComponent implements OnInit {
  form;
  editingId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      amount: [null as number | null, [Validators.required, Validators.min(1)]],
      type: ['expense', Validators.required],
      category: ['', Validators.required],
      note: [''],
    });
  }

  ngOnInit(): void {
    // Lấy id từ URL: /transactions/:id/edit
    this.editingId = this.route.snapshot.paramMap.get('id');
    if (this.editingId) {
      this.loadForEdit(this.editingId);
    }
  }

  private loadForEdit(id: string): void {
    const raw = localStorage.getItem('transactions');
    const current: Transaction[] = raw ? JSON.parse(raw) : [];
    const tx = current.find(t => t.id === id);

    if (!tx) {
      // Không tìm thấy record -> quay lại list
      this.router.navigateByUrl('/transactions');
      return;
    }

    this.form.patchValue({
      date: tx.date,
      amount: tx.amount,
      type: tx.type,
      category: tx.category,
      note: tx.note ?? '',
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;

    const raw = localStorage.getItem('transactions');
    const current: Transaction[] = raw ? JSON.parse(raw) : [];

    // Edit mode
    if (this.editingId) {
      const idx = current.findIndex(t => t.id === this.editingId);
      if (idx === -1) {
        this.router.navigateByUrl('/transactions');
        return;
      }

      current[idx] = {
        ...current[idx],
        date: value.date!,
        amount: Number(value.amount),
        type: value.type as 'income' | 'expense',
        category: value.category!,
        note: value.note || undefined,
      };

      localStorage.setItem('transactions', JSON.stringify(current));
      this.router.navigateByUrl('/transactions');
      return;
    }

    // Add mode
    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : String(Date.now());

    const newTx: Transaction = {
      id,
      date: value.date!,
      amount: Number(value.amount),
      type: value.type as 'income' | 'expense',
      category: value.category!,
      note: value.note || undefined,
    };

    current.unshift(newTx);
    localStorage.setItem('transactions', JSON.stringify(current));
    this.router.navigateByUrl('/transactions');
  }
}
