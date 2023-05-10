import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from './products.service';
import { MatTableDataSource } from '@angular/material/table';
import { AddProductComponent } from './add-product/add-product.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) set matPaginator(
    mp: MatPaginator
  ) {
    if (mp) {
      this.dataSource.paginator = mp;
    }
  }
  constructor(
    private productService: ProductsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addProduct() {
    const dialogRef = this.dialog.open(AddProductComponent);
    dialogRef.afterClosed().subscribe((isSucces) => {
      if (isSucces) this.loadData();
    });
  }
  editProduct() {
    const dialogRef = this.dialog.open(AddProductComponent);
    dialogRef.afterClosed().subscribe((isSucces) => {
      if (isSucces) this.loadData();
    });
  }
  loadData() {
    this.productService.getProductList().subscribe((response: any) => {
      this.dataSource.data = response.allProducts;
    });
  }
  displayedColumns: string[] = [
    '_id',
    'productName',
    'productPrice',
    'productQuantity',
    'productCategory',
    'action'
  ];
  dataSource: any = new MatTableDataSource<any>([]);
}
