import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { AddProductComponent } from './add-product/add-product.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [ProductsComponent, AddProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class ProductsModule {}
