import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers/customers.service';
import { ProductsService } from '../products/products.service';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit , AfterViewInit{
  customerCount: number = 0;
  productCount: number = 0;
  chart:any=[];
  qty = [];
  productName = [];
  topProductList: any = [];
  chartOptions = {
    
    title: {
      text: 'Top 3 product',
    },
    animationEnabled: true,
    axisY: {
      includeZero: true,
      suffix: ' Qty',
    },
    data: [
      {
        type: 'bar',
        indexLabel: '{y}',
        yValueFormatString: '#,### Quantity',
        dataPoints: [
         
          
          { label: 'Electronic', y: 360 },
          { label: 'Fruit', y: 430 },
          { label: 'Seeds', y: 500 },
        ],
      },
    ],
  };

  constructor(
    private customerService: CustomersService,
    private productServices: ProductsService
  ) {}
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    console.log(this.topProductList,'list>>>>>>>>>>>');
    
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.customerService.customerList().subscribe((res: any) => {
      let counter = setInterval(() => {
        this.customerCount++;
        if (this.customerCount === res.count) {
          this.customerCount = res.count;
          clearInterval(counter);
        }
      }, 50);
    });
    this.productServices.getProductList().subscribe((res: any) => {
      let counter = setInterval(() => {
        this.productCount++;
        if (this.productCount === res.count) {
          this.productCount = res.count;
          clearInterval(counter);
        }
      }, 50);
    });
    this.productServices.topProducts().subscribe((res: any) => {
      this.topProductList = res.allProducts;
      this.qty = this.topProductList.map((qty:any)=> qty.productQuantity )
      this.productName = this.topProductList.map((name:any)=> name.productName )
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.productName,
          datasets: [
            {
              data: this.qty,
              borderColor: 'white',
              label: 'Product Quantity',
              backgroundColor: 'blueviolet',
              borderWidth: 3,
            },
          ],
        },
      });
    });
  }
}
