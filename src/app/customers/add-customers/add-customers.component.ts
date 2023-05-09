import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomersService } from '../customers.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.css'],
})
export class AddCustomersComponent implements OnInit {
  CustomerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerServices: CustomersService,
    private dialogRef: MatDialogRef<AddCustomersComponent>
  ) {}

  ngOnInit(): void {
    this.CustomerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      emailAddress: [''],
      phoneNumber: [''],
      dob: [''],
      department: [''],
    });
  }
  addCustomer() {
    const makePayload = {
      firstName: this.CustomerForm.get('firstName')?.value,
      lastName: this.CustomerForm.get('lastName')?.value,
      emailAddress: this.CustomerForm.get('emailAddress')?.value,
      phoneNumber: this.CustomerForm.get('phoneNumber')?.value,
      dob: this.CustomerForm.get('dob')?.value,
      department: this.CustomerForm.get('department')?.value,
    };
    this.customerServices.addCustomer(makePayload).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.router.navigate(['/customers']);
  }
  close() {
    this.dialogRef.close(false);
  }
}
