import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '../../core/store.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-counter-bar',
  standalone: true,
  imports:[CommonModule,MatIconModule],
  templateUrl: './counter-bar.component.html',
  styleUrls: ['./counter-bar.component.scss']
})
export class CounterBarComponent implements OnInit {
  counts: { status: string, count: number }[] = [];
  paidCount = 0;
  pendingCount = 0;
  overdueCount = 0;

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.store.statusCounts$.subscribe(c => {
      this.counts = c;
      this.paidCount = c.find(v => v.status === 'paid')?.count || 0;
      this.pendingCount = c.find(v => v.status === 'pending')?.count || 0;
      this.overdueCount = c.find(v => v.status === 'overdue')?.count || 0;
    });
  }
}
