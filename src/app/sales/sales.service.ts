import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor(private http: HttpClient) {}
  getSalesList() {
    return this.http.get('http://localhost:3000/sales/allSales');
  }
  addSales(payload: any) {
    return this.http.post('http://localhost:3000/sales/addsales', payload);
  }
}
