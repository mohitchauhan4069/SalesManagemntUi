import { Component, OnInit, ViewChild } from '@angular/core';
import { SalesService } from './sales.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AddSalesComponent } from './add-sales/add-sales.component';
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
  addSales() {
    const dialogRef = this.dialog.open(AddSalesComponent);
    dialogRef.afterClosed().subscribe((isSucces) => {
      if (isSucces) this.loadData();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [
    'cust_Id',
    'prod_Id',
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
