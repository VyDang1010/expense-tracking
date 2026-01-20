import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Transaction } from '../../../core/models/transaction';

@Component({
  selector: 'app-transaction-form-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './transaction-form-page.component.html',
  styleUrls: ['./transaction-form-page.component.css'],
})
export class TransactionFormPageComponent {
  form;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      amount: [null as number | null, [Validators.required, Validators.min(1)]],
      type: ['expense', Validators.required],
      category: ['', Validators.required],
      note: [''],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;

    const newTx: Transaction = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now()),
      date: value.date!,
      amount: Number(value.amount),
      type: value.type as 'income' | 'expense',
      category: value.category!,
      note: value.note || undefined,
    };

    const raw = localStorage.getItem('transactions');
    const current: Transaction[] = raw ? JSON.parse(raw) : [];
    current.unshift(newTx);
    localStorage.setItem('transactions', JSON.stringify(current));

    this.router.navigateByUrl('/transactions');
  }
}
