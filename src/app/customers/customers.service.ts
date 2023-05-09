import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './customers.model';
@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  addCustomer(makePayload: Customer) {
    return this.http.post('http://localhost:3000/customers/add', makePayload);
  }
  customerList() {
    return this.http.get('http://localhost:3000/customers/list');
  }
}
