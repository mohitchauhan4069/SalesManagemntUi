import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.css']
})
export class AddSalesComponent implements OnInit {
  formGroup!: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }
  add(){}
  close(){}
}
