import { Component, OnInit } from '@angular/core';
import { Buy } from '../../../models/buy';
import { BuyService } from '../../../services/buy.service';

@Component({
  selector: 'app-buy-list',
  templateUrl: './buy-list.component.html',
  styleUrls: ['./buy-list.component.css']
})
export class BuyListComponent implements OnInit {
  buys: Buy[] = [];
  errorMessage: string = '';
product: any;

  constructor(private buyService: BuyService) {}

  ngOnInit(): void {
    this.loadBuys();
  }

  loadBuys(): void {
    this.buyService.getAllBuys().subscribe({
      next: (data) => {
        this.buys = data;
      },
      error: (err) => {
        this.errorMessage = 'No se pudieron cargar las compras.';
        console.error(err);
      }
    });
  }
}
