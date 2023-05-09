import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomersService } from '../customers.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AddCustomersComponent } from '../add-customers/add-customers.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css'],
})

export class ListCustomersComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) set matPaginator(
    mp: MatPaginator
  ) {
    if (mp) {
      this.dataSource.paginator = mp;
    }
  }
  constructor(private customerServices: CustomersService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadData() {
    this.customerServices.customerList().subscribe((response: any) => {
      this.dataSource.data = response.customerDetails;
    });
  }
  addCustomer(){
    const dialogref=this.dialog.open(AddCustomersComponent);
  }
  displayedColumns: string[] = [
    '_id',
    'firstName',
    'lastName',
    'dob',
    'phoneNumber',
    'emailAddress',
    'action'
  ];
  dataSource: any = new MatTableDataSource<any>([]);
}
