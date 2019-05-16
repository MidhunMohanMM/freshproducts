import { Component, OnInit } from '@angular/core';
// import { DataService } from '../data.service';
import {ActivatedRoute} from '@angular/router';
import { Router, NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
import axios from "axios";
import { AppGlobals } from '../app.global';

@Component({
  selector: 'app-hubdashboard',
  templateUrl: './hubdashboard.component.html',
  styleUrls: ['./hubdashboard.component.css'],
  providers: [AppGlobals]
})
export class HubdashboardComponent implements OnInit {

  country: any = [];
  lineChartOptions: any;

    public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

  public lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90],
    [48, 38, 50, 39, 56, 77, 60]
  ];
   public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // public lineChartLabels:Array<any> = ['January','Jan 1-7','Jan 8-14','Jan 15-21','Jan 22-29','Jan 30-31'];
  public lineChartType:string = 'line';
  
  public pieChartLabels:string[] = ['Data 1', 'Data 2', 'Data 3', 'Data 4'];
  public pieChartData:number[] = [300, 250, 350, 100];
  public pieChartType:string = 'pie';
  hubuser: any;
  username: any;
  number: any;
  hubuserid: any;
  hubusertype: any;
  designation: any;
  routelength: any;
  routes: any;
  hubsid: any;
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  public donutChartData = [{
    id: 0,
    label: 'water',
    value: 20,
    color: 'red',
  }, {
    id: 1,
    label: 'land',
    value: 20,
    color: 'blue',
  }, {
    id: 2,
    label: 'sand',
    value: 30,
    color: 'green',
  }, {
    id: 3,
    label: 'grass',
    value: 20,
    color: 'yellow',
  }, {
    id: 4,
    label: 'earth',
    value: 10,
    color: 'pink',
  }];

  // public pieChartData = [{
  //   id: 0,
  //   label: 'Resellers',
  //   value: 30,
  //   color: '#4D4D4D ',
  // }, {
  //   id: 1,
  //   label: 'VARs',
  //   value: 25,
  //   color: '#5DA5DA',
  // }, {
  //   id: 2,
  //   label: 'SI',
  //   value: 35,
  //   color: '#FAA43A',
  // },{
  //   id: 3,
  //   label: 'ISV',
  //   value: 10,
  //   color: '#60BD68',
  // }]

  public colors = ['red', 'green', '#faa43a']
  public  dataColumns = [1]; // Single Bar Chart
  // public  dataColumns = [3]; // Stacked Bar Chart
   //public  dataColumns = [2, 1]; // Multi Stacked Bar Chart
//   public  barChartData = [{
//       id: 0,
//       label: 'Vendor 1',
//       value1: 10,
//       value2: 10,
//       value3: 10,
//    },{
//       id: 1,
//       label: 'Vendor 2',
//       value1: 20,
//       value2: 10,
//       value3: 10,
//    },{
//     id: 2,
//     label: 'Vendor 3',
//     value1: 18,
//     value2: 10,
//     value3: 10,
//  },{
//   id: 3,
//   label: 'Vendor 4',
//   value1: 8,
//   value2: 10,
//   value3: 10,
// },{
//   id: 4,
//   label: 'Vendor 5',
//   value1: 15,
//   value2: 10,
//   value3: 10,
// }]



  count = {
    countTo: 100,
    from: 0,
    duration: 1
};

hubname:any = "";



constructor(  private route : ActivatedRoute ,  private router: Router, private _location: Location, private _global: AppGlobals) {
  this.route.params.subscribe(params => {
    console.log(params);
    this.number = params;
    this.hubuserid = this.number.id;
    //this.eid = this.number.id2;
    console.log(this.hubuserid);
   // console.log(this.eid);

    });
 }

  ngOnInit() {
    this.gethubuser();
 
  }

  

  getroutes(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/routes/profiles?hubs[hubsid]=${self.hubsid}`)
        .then(function (res) {
          console.log(res);
          self.routes = res.data;
          self.routelength = res.data.length;
          console.log(self.routelength)
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  gethubuser(){
    var self = this;
    var hubsid = localStorage.getItem('Hubsid');
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/users/profiles/${ this.hubuserid}` )
        .then(function (res) {
          console.log(res);
          self.hubsid = res.data.hubsid;
          self.hubname = res.data.hub.name;
          self.username = res.data.name;
          self.designation = res.data.hubs_userstype.name;
          self.hubusertype = res.data.hubsuserstypesid;
          self.getroutes();
        })
        .catch(function (error) {
          console.log(error);
        });
  }


}
