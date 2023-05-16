import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers/customers.service';
import { ProductsService } from '../products/products.service';
import Chart from 'chart.js/auto';
import { SalesService } from '../sales/sales.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  customerCounter: number = 0;
  customerCount: number = 0;
  productCounter: number = 0;
  productCount: number = 0;
  salesproductCount: number = 0;
  salesCounter: number = 0;
  chart: any = [];
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
  salesCounterNew: any;

  constructor(
    private customerService: CustomersService,
    private productServices: ProductsService,
    private salesservices: SalesService
  ) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.loadData();
    this.createChart();
    this.createPieChart();
  }

  loadData() {
    this.customerService.customerList().subscribe((res: any) => {
      let counter = setInterval(() => {
        this.customerCount = res.count;
        this.customerCounter++;
        if (this.customerCounter === this.customerCount) {
          this.customerCounter = this.customerCount;
          clearInterval(counter);
        }
      }, 50);
    });
    this.productServices.getProductList().subscribe((res: any) => {
      this.productCount = res.count;
      let counter = setInterval(() => {
        this.productCounter++;
        if (this.productCounter === this.productCount) {
          this.productCounter = this.productCount;
          clearInterval(counter);
        }
      }, 50);
    });
    this.productServices.topProducts().subscribe((res: any) => {
      this.topProductList = res.allProducts;
      this.qty = this.topProductList.map((qty: any) => qty.productQuantity);
      this.productName = this.topProductList.map(
        (name: any) => name.productName
      );
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.productName,
          datasets: [
            {
              data: this.qty,
              borderColor: 'white',
              label: ' Top Product Quantity',
              backgroundColor: 'blueviolet',
              borderWidth: 3,
            },
          ],
        },
      });
    });

    this.salesservices.getSalesList().subscribe((res: any) => {
      res.allSales.forEach((productQuantity: any) => {
        this.salesproductCount += productQuantity.productQuantity;
      });
      this.salesCounterNew = this.salesproductCount;
      let counter = setInterval(() => {
        this.salesCounter++;
        if (this.salesCounter === this.salesCounterNew) {
          this.salesCounter = this.salesCounterNew;
          clearInterval(counter);
        }
      }, 1);
    });
  }
  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'line',

      data: {
        labels: [
          '2022-05-10',
          '2022-05-11',
          '2022-05-12',
          '2022-05-13',
          '2022-05-14',
          '2022-05-15',
          '2022-05-16',
          '2022-05-17',
        ],
        datasets: [
          {
            label: 'Sales',
            data: ['467', '576', '572', '79', '92', '574', '573', '576'],
            backgroundColor: 'blueviolet',
          },
          {
            label: 'Profit',
            data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
            backgroundColor: 'limegreen',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
  createPieChart() {
    this.chart = new Chart('MyPieChart', {
      type: 'pie',
      data: {
        labels: ['Celling Fan', 'Television', 'Kiwi', 'Graphes'],
        datasets: [
          {
            label: 'total product sell',
            data: [20, 15, 32, 30],
            backgroundColor: ['#23db36', 'blueviolet', 'yellow', 'orange'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
