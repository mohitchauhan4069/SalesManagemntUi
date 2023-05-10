import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../products.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  mode!: string;
  formGroup!: FormGroup;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddProductComponent>,
    private fb: FormBuilder,
    private productServices: ProductsService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      productName: ['', [Validators.required]],
      productPrice: ['', [Validators.required]],
      productQuantity: ['', [Validators.required]],
      productCategory: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  add() {
    const makePayload = {
      productName: String(this.formGroup.get('productName')?.value),
      productPrice: Number(this.formGroup.get('productPrice')?.value),
      productQuantity: Number(this.formGroup.get('productQuantity')?.value),
      productCategory: String(this.formGroup.get('productCategory')?.value),
      active: Boolean(this.formGroup.get('status')?.value),
    };
    if (!this.formGroup.valid) return;
    else {
      this.productServices.addProduct(makePayload).subscribe({
        next: (res) => {},
        error: (err) => {},
        complete: () => {},
      });

      this.dialogRef.close(true);
    }
  }
  close() {
    this.dialogRef.close(false);
  }
}
 