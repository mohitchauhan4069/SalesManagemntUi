import { Component, OnInit, ViewChild } from '@angular/core';
import { SalesService } from './sales.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) set matPaginator(
    mp: MatPaginator
  ) {
    if (mp) {
      this.dataSource.paginator = mp;
    }
  }
  constructor(private salesServices: SalesService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.salesServices.getSalesList().subscribe((res: any) => {
      this.dataSource.data = res.allSales;
    });
  }
  addSales() {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [
    'cust_Id',
    // 'cust_Name',
    'prod_Id',
    // 'prod_Name',
    'productQuantity',
    'totalAmount',
    'currentPayment',
    'remaningPayment',
    'paymentMode',
    'createdAt',
    'action',
  ];
  dataSource: any = new MatTableDataSource<any>([]);
}
