import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { event } from 'jquery';
import { CustomersService } from 'src/app/customers/customers.service';
import { ProductsService } from 'src/app/products/products.service';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.css'],
})
export class AddSalesComponent implements OnInit {
  formGroup!: FormGroup;
  customerList: any;
  productList: any;
  price: any;
  totalAmountValue: any;
  constructor(
    private customerServices: CustomersService,
    private dialogRef: MatDialogRef<AddSalesComponent>,
    private productservices: ProductsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.formGroup = this.fb.group({
      customerName: ['', Validators.required],
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productQuantity: ['', Validators.required],
      totalAmount: ['', Validators.required],
      paymentMode: ['', Validators.required],
    });
  }
  onSelectionChange(id: string) {
    if (id) {
      this.price = this.productList.find((product: any) => {
        return product.id === id;
      });
      this.formGroup.patchValue({
        productPrice: this.price.productPrice,
      });
    }
  }
  totalAmount(event: any) {
    this.totalAmountValue =
      Number(this.formGroup.get('productPrice')?.value) *
      Number(event.target.value);
    this.formGroup.patchValue({
      totalAmount: this.totalAmountValue,
    });
  }

  loadData() {
    this.customerServices.customerList().subscribe((response: any) => {
      this.customerList = response.customerDetails.map((details: any) => {
        return {
          name: details.firstName + ' ' + details.lastName,
          id: details._id,
        };
      });
    });
    this.productservices.getProductList().subscribe((response: any) => {
      this.productList = response.allProducts.map((details: any) => {
        return {
          name: details.productName,
          id: details._id,
          productPrice: details.productPrice,
        };
      });
    });
  }
  add() {}
  close() {
    this.dialogRef.close(false);
  }
}
