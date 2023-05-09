import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  getProductList() {
    return this.http.get('http://localhost:3000/products/list');
  }
  addProduct(makeMayload:Product) {
    return this.http.post('http://localhost:3000/products/add',makeMayload)
  }
  topProducts() {
    return this.http.get('http://localhost:3000/products/top-product')
  }
}
