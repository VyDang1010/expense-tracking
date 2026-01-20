import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type FilterType = 'income' | 'expense' | 'all';

@Component({
  selector: 'app-transaction-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.css']
})
export class TransactionFilterComponent {
  selectedType: FilterType = 'all';

  //Bắn dữ liệu ra ngoài cho page (component cha) khi có sự thay đổi
  @Output() typeChange = new EventEmitter<FilterType>();

  onTypeChange() {
    this.typeChange.emit(this.selectedType);
  }
}
