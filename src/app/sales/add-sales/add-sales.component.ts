import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomersService } from 'src/app/customers/customers.service';
import { ProductsService } from 'src/app/products/products.service';
import { SalesService } from '../sales.service';
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
    private fb: FormBuilder,
    private salesServices: SalesService
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
      currentPayment: ['', Validators.required],
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
  add() {
    const payload = {
      customerName: this.formGroup.value.customerName.name,
      customerId: this.formGroup.value.customerName.id,
      productId: this.formGroup.value.productName.id,
      productName: this.formGroup.value.productName.name,
      productPrice: this.formGroup.value.productPrice,
      productQuantity: this.formGroup.value.productQuantity,
      totalAmount: this.formGroup.value.totalAmount,
      paymentMode: this.formGroup.value.paymentMode,
      currentPayment: this.formGroup.value.currentPayment,
    };
    this.salesServices.addSales(payload).subscribe((res) => {
      this.dialogRef.close(true);
    });
  }
  close() {
    this.dialogRef.close(false);
  }
}
