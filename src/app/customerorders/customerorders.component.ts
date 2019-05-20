import { Component, OnInit } from '@angular/core';
import {ExcelService} from '../services/excel.service';
import axios from "axios";
import * as $ from 'jquery';
import {ActivatedRoute} from '@angular/router';
import { NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { columnsTotalWidth } from '@swimlane/ngx-datatable/release/utils';
import {IMyDpOptions} from 'mydatepicker';
import { AppGlobals } from '../app.global';

@Component({
  selector: 'app-customerorders',
  templateUrl: './customerorders.component.html',
  styleUrls: ['./customerorders.component.css'],
  providers: [AppGlobals]
})
export class CustomerordersComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {

    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    showClearDateBtn: false,
    inline: false,
    monthLabels: { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' }
};

public model: any = { date: { year: 2019, month: 10, day: 9 } };


  number:any
  hubuserid:any;
  loading: boolean = true;
  customerid:any
  hubsid:any
  hubname:any
  username:any
  hubusertypeid:any
  selectcsid:any =""
  selectedCustomer:any =""
  allcustomers: any;
  allcustomerdetails: any = [];
  key: any = "customername";
  search1: any = "";
  reverse: boolean;
  customerorders: any;
  customerprofiles: any;
  selectedshop: any = "";
  deliverydate: string;
  dummycustomerorders: any;
  addmonth: string;
  public p: any;
  public pq: any;
  dropdownSettingsofcustomers = {};
  customersid: any;
  allcustomerorders: any = [];
  customerorderprofiles: any = [];
  routes: any;
  dropdownSettingsofroute = {};
  selectedroute: any = "";
  customerorderdetails: any;
  customerorderdetailsname: any;

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  constructor(private excelService:ExcelService,private route : ActivatedRoute,private router: Router, private _location: Location, private _global: AppGlobals) {
    this.route.params.subscribe(params => {
      // console.log(params);
      this.number = params;
      this.hubuserid = this.number.id;
      // console.log(this.hubuserid);
      });
   }
  ngOnInit() {
    this.gethubuser();
    this.getcustomerorder();

    // this.getcustomerprofiles();
    // this.getcustomerorderprofiles();
    
    var today = new Date();
    console.log(today);
    this.model.date.day = today.getDate();
    this.model.date.month = today.getMonth() + 1;
    this.model.date.year = today.getFullYear() ;
    // this.getorderbydeliverydate();
    
    this.dropdownSettingsofcustomers = {
      singleSelection: true,
      idField: 'customersid',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    }

    this.dropdownSettingsofroute = {
      singleSelection: true,
      idField: 'routesid',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    }


  }



  
  onItemDeSelect(item: any) {
    // console.log("item");
    this.getprofilebycustomerID();
    // this.selectedroute = item.name;
  }

  onItemSelect(item: any) {
    console.log(item);
    this.getprofilebycustomerID();
    // this.selectedroute = item.name;
  }

  
  
  onItemDeSelectroute(item: any) {
    // console.log("item");
    this.getcustomerbyroute();
    // this.selectedroute = item.name;
  }

  onItemSelectroute(item: any) {
    console.log(item);
    this.getcustomerbyroute();
    // this.selectedroute = item.name;
  }


  onSelectAll(items: any) {
    console.log(items);
  }

  
  onSelectAllroute(items: any) {
    console.log(items);
  }


  gethubuser(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/users/profiles/${ this.hubuserid}` )
        .then(function (res) {
         
          console.log(res);
          self.hubsid = res.data.hubsid;
          self.hubname = res.data.hub.name;
          self.username = res.data.name;
          console.log(self.hubsid);
          self.hubusertypeid = res.data.hubsuserstypesid;
          // self.getCustomerOrderTable();
          if(self.hubusertypeid == '1'){
            self.router.navigate(['']);
          }
          self.getcustomerorderprofiles();
          self.getcustomerprofiles();
          self.getallroutes();
          //  
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  getcustomerprofiles(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/customers/profiles?customers[status]=1&routes[hubsid]=${self.hubsid}`)
        .then(function (res) {
          console.log(res);
          console.log(self.hubsid);
          self.customerprofiles = res.data;
          // self.getCustomerOrderTable();
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getallroutes(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/routes/profiles?routes[status]=1&hubs[hubsid]=${self.hubsid}`)
        .then(function (res) {
          console.log(res);
          self.routes = res.data;   
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getcustomerbyroute(){
    var self = this;
    if(self.selectedroute == ""){
      self.getcustomerorderprofiles();
    }
    else{

 
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/customers/orders/profiles?customers[status]=1&routes[hubsid]=${self.hubsid}&routes[routesid]=${self.selectedroute[0].routesid}`)
        .then(function (res) {
          console.log(res);
          // self.customerorderprofiles = response.data;
          for(let key in res.data){
            if(res.data[key]){
              res.data[key].customername = res.data[key].customer.name;
              res.data[key].customerroutename = res.data[key].customer.route.name;
            }
          }
          self.customerorderprofiles = res.data;   
        })
        .catch(function (error) {
          console.log(error);
        });
      }
  }

  customerordersbyID(cstID){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/customers/orders/details?orders[customersid]=${cstID}`)
        .then(function (res) {
          console.log(res);
          for(let key in res.data){
            res.data[key].productname = res.data[key].product.name;
          }
          self.customerorderdetails = res.data;   
          
          if(res.data.length > 0){
            $('#orderdetails').attr('style','display: block');
            self.customerorderdetailsname = res.data[0].order.customer.name;
            $('html,body').animate({ scrollTop: 750 }, 600)
          }

        })
        .catch(function (error) {
          console.log(error);
        });
  }

  
  getprofilebycustomerID(){
    var self = this;
    if(self.selectedshop == ""){
      self.getcustomerorderprofiles();
    }
    else{
      axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/customers/orders/profiles?customers[customersid]=${self.selectedshop[0].customersid}`)
      .then(function (response) {
        console.log(response);
        self.customerorderprofiles = response.data;
        for(let key in response.data){
          if(response.data[key]){
            response.data[key].customername = response.data[key].customer.name;
            response.data[key].customerroutename = response.data[key].customer.route.name;
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
  
}


  getorderbycustomerID(){
      var self = this;
      if(self.selectedshop == ""){
        self.getcustomerorder();
      }
      else{
        axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/customers/orders/details?orders[customersid]=${self.selectedshop[0].customersid}&?ordersdetails[status]=1`)
        .then(function (response) {
          console.log(response);
          self.customerorders = response.data;
          for(let key in response.data){
            response.data[key].ordercustomername = response.data[key].order.customer.name;
            response.data[key].productname = response.data[key].product.name;
            response.data[key].productunit = response.data[key].product.unit;
            var d = new Date(response.data[key].order.deliverydate); 
            var date = d.getUTCDate();
            var month = d.getUTCMonth();
            var year = d.getUTCFullYear();
            response.data[key].deliverydate = date + '-' + month+ '-' +year;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    
    
  }


 async getcustomerorderprofiles(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/customers/orders/profiles?orders[status]=1`)
    .then(function (response) {
      // self.loading = false;
      console.log(response);
   for(var i = 0; i< response.data.length; i++ ){
    if(response.data[i].customer){
      if( response.data[i].customer.route.hubsid == self.hubsid ){

        // for(let key in response.data[i]){
            // if(response.data[key]){
              response.data[i].customername = response.data[i].customer.name;
              response.data[i].customerroutename = response.data[i].customer.route.name;
              response.data[i].ordercount = "0";
            // }
          // }

        self.customerorderprofiles.push(response.data[i]);
    }
    }
  }
    console.log(self.customerorderprofiles);
    self.test();
   
      // for(var i = 0; i < response.data.length; i++ ){
      // self.customersid = response.data[i].customersid;
      //   axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/customers/orders/details?orders[customersid]=${self.customersid}`)
      //   .then(function (response) {
      //     self.loading = false;
      //     console.log(response);
      //     for(var i = 0; i < response.data.length; i++ ){
      //       for(let key in response.data[i]){
      //         if(response.data[key]){
      //           response.data[key].ordercustomername = response.data[key].order.customer.name;
      //           response.data[key].productname = response.data[key].product.name;
      //           response.data[key].productunit = response.data[key].product.unit;
      //           var d = new Date(response.data[key].order.deliverydate); 
      //           var date = d.getUTCDate();
      //           var month = d.getUTCMonth()  + 1;
      //           var year = d.getUTCFullYear();
      //           response.data[key].deliverydate = date + '-' + month+ '-' +year;
      //         }

      //       }
      //       self.allcustomerorders.push(response.data[i]);
      //     }
      //     console.log(self.allcustomerorders);


          
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      // }



    })
    .catch(function (error) {
      console.log(error);
    });

  
  }

  async  test(){
    await Promise.all( this.customerorderprofiles.map(async (num) => {
      const result = await this.getorderdetailcount(num);
    }));
  }

  getorderdetailcount(x){
    return new Promise((resolve, reject) => {
      var self = this;
      axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/customers/orders/details?ordersdetails[status]=1&orders[ordersid]=${x.ordersid}`)
      .then(function (response) {
        self.loading = false;
        console.log(response);
        x.ordercount = response.data.length;
        // self.customerorders = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    });
  }




  getcustomerorder(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/customers/orders/details?ordersdetails[status]=1`)
    .then(function (response) {
      self.loading = false;
      console.log(response);
      self.customerorders = response.data;
      for(let key in response.data){
        response.data[key].ordercustomername = response.data[key].order.customer.name;
        response.data[key].productname = response.data[key].product.name;
        response.data[key].productunit = response.data[key].product.unit;
        var d = new Date(response.data[key].order.deliverydate); 
        var date = d.getUTCDate();
        var month = d.getUTCMonth()  + 1;
        var year = d.getUTCFullYear();
        response.data[key].deliverydate = date + '-' + month+ '-' +year;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getCustomerOrderTable(){
    var self = this;
    axios.get('http://103.214.233.141:2981/v1/secure/customers/opt/profiles?hubsid=' + self.hubsid)
    .then(function (response) {
      console.log(response);
      self.allcustomers = response.data;
      for (let key in self.allcustomers){
         
          axios.get('http://103.214.233.141:2981/v1/secure/customers/orders/details?orders[customersid]=' + response.data[key].customersid)
          .then(function (response) {
            console.log(response);
            self.allcustomerdetails.push(response.data);
            // self.allcustomers[key].deliverydate = response.data[key].order.deliverydate;
            console.log(self.allcustomerdetails);
          })
          .catch(function (error) {
            console.log(error);
          });
        
      }
      console.log(self.allcustomers);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getOrderTablebyId(){
      var self = this;
      axios.get('http://103.214.233.141:2981/v1/secure/customers/orders/details')
      .then(function (response) {
        console.log(response);
        self.customerorders = response.data;
        for(let key in response.data){
          response.data[key].ordercustomername = response.data[key].order.customer.name;
          response.data[key].productname = response.data[key].product.name;
          response.data[key].productunit = response.data[key].product.unit;
          var d = new Date(response.data[key].order.deliverydate); 
          var date = d.getUTCDate();
          var month = d.getUTCMonth();
          var year = d.getUTCFullYear();
          response.data[key].deliverydate = date + '-' + month+ '-' +year;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getorderbydeliverydate(){
    var self = this;
    console.log($("#date").val());

  console.log(self.model);
  // if(self.model.month == 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9)
  // {
  //   self.model.date.month = '0'+self.model.date.month;
  // }
  self.deliverydate = self.model.date.year + '-' + self.model.date.month+ '-' +self.model.date.day+'T00:00:00.000Z';
  console.log(self.deliverydate);
      axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/customers/orders/profiles?orders[deliverydate]=${self.deliverydate}`)
      .then(function (response) {
        console.log(response);
     
        // for(let key in response.data){
        //   response.data[key].ordercustomername = response.data[key].order.customer.name;
        //   response.data[key].productname = response.data[key].product.name;
        //   response.data[key].productunit = response.data[key].product.unit;
        //   var d = new Date(response.data[key].order.deliverydate); 
        //   var date = d.getUTCDate();
        //   var month = d.getUTCMonth();
        //   var year = d.getUTCFullYear();
        //   response.data[key].deliverydate = date + '-' + month+ '-' +year;
          
        // }
        self.dummycustomerorders = response.data;


        console.log(self.model);
                        if(self.model.month == 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9)
                        {
                          self.addmonth = '0'+self.model.date.month;
                        }
                        self.deliverydate = self.model.date.year + '-' + self.addmonth+ '-' +self.model.date.day+'T00:00:00.000Z';
                        console.log(self.deliverydate);

                      axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/customers/orders/profiles?orders[deliverydate]=${self.deliverydate}`)
                      .then(function (response) {
                        console.log(response);
                    
                        for(var i = 0; i< response.data.length; i++ ){
                          if(response.data[i].customer){
                            if( response.data[i].customer.route.hubsid == self.hubsid ){
                      
                              // for(let key in response.data[i]){
                                  // if(response.data[key]){
                                    response.data[i].customername = response.data[i].customer.name;
                                    response.data[i].customerroutename = response.data[i].customer.route.name;
                                  // }
                                // }
                      
                              self.customerorderprofiles.push(response.data[i]);
                          }
                          }
                        }
                          console.log(self.customerorderprofiles);
                        if(response.data.length == 0){
                          self.customerorderprofiles = [];
                        }
                        // else{
                        //   self.customerorderprofiles.push(response.data);
                        // }
                        
                
                
                        console.log(self.model);
                
                
                        
                      })
                      .catch(function (error) {
                        console.log(error);
                      });

        
      })
      .catch(function (error) {
        console.log(error);
      });
      

    }
}