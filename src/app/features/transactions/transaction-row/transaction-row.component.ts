import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../../core/models/transaction';

@Component({
  selector: 'app-transaction-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-row.component.html',
  styleUrls: ['./transaction-row.component.css']
})
export class TransactionRowComponent {
  @Input() item!: Transaction;

  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();

  onDelete() {
    this.delete.emit(this.item.id);
  }

  onEdit() {
    this.edit.emit(this.item.id);
  }
}
