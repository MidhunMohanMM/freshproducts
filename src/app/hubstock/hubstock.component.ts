import { Component, OnInit } from '@angular/core';
// import { DataService } from '../data.service';
import {ActivatedRoute} from '@angular/router';
import { Router, NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
import axios from "axios";

import { AppGlobals } from '../app.global';
import $ from "jquery";


import Swal from 'sweetalert2';
@Component({
  selector: 'app-hubstock',
  templateUrl: './hubstock.component.html',
  styleUrls: ['./hubstock.component.css'],
  providers: [AppGlobals]
})
export class HubstockComponent implements OnInit {
  hubStock:any =[];
  order:any = "";
  vans: any;
  search1:any = "";
  selectedorder: any = "";
  key: string = 'productname'; //set default
  reverse: boolean ;
  hubuserid: string;
  hubname: any;
  username: any;
  hubusertypeid: any;
  number: any;
  products: any;
  selectedproduct: any = "";
  selectedstocktype: any = "";
  quantity: any = "";
  hubsid: any;
  stocktypes: any;
  public p: any;
  public popoverTitle: string = 'Delete Hub Stock';
  public popoverMessage: string = 'Are you really <b>sure</b> you want to do this?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  hubsstocksid: any;
  hu: string;
  selectedcustomer: any;
  promoted: any;
  regularly: any;
  dropdownSettings = {};
  product = [];
  hubstockflag: boolean = false;
  loading: boolean = true;
  cstorders: any;
  day: number;
  month: any;
  year: number;
  deliverydate: string;

    
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

    
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
    this.getstocktypes();
    // this.takeproducts()
  }

  onItemSelect(item: any) {
    console.log(item)

  }
  onSelectAll(items: any) {
    console.log(items);
  }


  gethubuser(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/users/profiles/${ this.hubuserid}`)
        .then(function (res) {
          console.log(res);
          self.hubsid = res.data.hubsid;
          self.hubname = res.data.hub.name;
          self.username = res.data.name;
          self.hubusertypeid = res.data.hubsuserstypesid;
          if(self.hubusertypeid == '1'){
            self.router.navigate(['']);
          }
          // self.takeproducts();
          self.hubStockTable();
         
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  async  hubStockTable(){
    var self = this;
    console.log(self.hubsid);
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/stocks?hubs[hubsid]=${self.hubsid}&hubsstocks[status]=1`)
        .then(function (res) {
          self.loading = false;
          if(res.data.length != 0){
            self.hubstockflag = true;
          }
         console.log(res.data);



        for (let key in res.data){
          res.data[key].productname = res.data[key].product.name;
          res.data[key].stocktypename = res.data[key].stocks_type.name;
          res.data[key].preorder = "0";
        }
        console.log(res.data);
          self.hubStock = res.data;
          self.test();
          // self.addpreorder();
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  async  test(){
    await Promise.all( this.hubStock.map(async (num) => {
      const result = await this.getpreorder(num);
    }));
  }

  getpreorder(x){

    return new Promise((resolve, reject) => {
      var self = this;

      var today = new Date();
      console.log(today);
      self.day = today.getDate();
      self.month = today.getMonth() + 1;
      if(self.month == 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9)
      {
        self.month = '0'+self.month;
      }
      self.year = today.getFullYear() ;
      self.deliverydate = self.year + '-' + self.month+ '-' +self.day+'T00:00:00.000Z';
      console.log(self.deliverydate);

      console.log(self.selectedorder);
      axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/customers/orders/details?products[productsid]=${x.productsid}&orders[deliverydate]=${self.deliverydate}` )
          .then(function (response) {
            console.log(response);
            for(let key in response.data){
              if(self.hubsid == response.data[key].order.customer.route.hubsid){
                var pre = response.data[key].quantity + parseInt(x.preorder);
                x.preorder = pre;
              }
           
              
            }
            var diff = parseInt(x.quantity) - parseInt(x.preorder);
            x.quantity = diff;
            // x.preorder = response.data[0].quantity;
            // self.stocktypes = response.data;
            
          })
          .catch(function (error) {
            console.log(error);
          });
    });

  }

  takeproducts(){
    var self = this;
    console.log(self.selectedorder);
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/customers/orders/details` )
        .then(function (response) {
          console.log(response);
          
          for (let key in response.data){
            response.data[key].preorder = "0";
                if(self.hubsid == response.data[key].order.customer.route.hubsid){
                  response.data[key].preorder = parseInt(response.data[key].preorder) + response.data[key].quantity;

                  
                }

          }

          self.cstorders = response.data;

          console.log(self.cstorders);
          
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }


  addpreorder(){
    var self = this;

    for (let key1 in self.hubStock){
      self.hubStock[key1].preorder = 0;
      console.log(self.hubStock[key1].productsid);
      axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/customers/orders/details?products[productsid]=${self.hubStock[key1].productsid}` )
      .then(function (response) {
        console.log(response);
        for (let key2 in response.data){
          // console.log(response.data[key2].order.customer.route.hubsid);
          // console.log(self.hubsid);
            if(self.hubsid == response.data[key2].order.customer.route.hubsid){
              console.log(self.hubStock[key1].productsid);
              console.log(self.hubStock[key1].preorder) 
              console.log(self.hubStock[key2].quantity) 
              
              self.hubStock[key1].preorder = parseInt(self.hubStock[key1].preorder) + parseInt(response.data[key2].quantity);
              console.log(self.hubStock[key1].preorder) 
            }
          }

        
           console.log(self.hubStock)
        
      })
      .catch(function (error) {
        console.log(error);
      });

    }


// console.log(self.hubStock)
  }


  getproductbyordertype(){
    var self = this;
    console.log(self.selectedorder);
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/stocks?hubsstocks[stockstypesid]=${self.selectedorder}` )
        .then(function (response) {
          console.log(response);
          for (let key in response.data){
            response.data[key].productname = response.data[key].product.name;
            response.data[key].stocktypename = response.data[key].stocks_type.name;
          }
          self.hubStock = response.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getstocktypes(){
    var self = this;
    console.log(self.selectedorder);
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/stocks/types` )
        .then(function (response) {
          console.log(response);
          self.stocktypes = response.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  addhubstock(){
    if(this.selectedproduct== undefined || this.selectedproduct == ''){
      $("#hubstock_product_error").html("Please select Product").show().fadeOut(2000);
     }else if(this.selectedstocktype == undefined ||  this.selectedstocktype == ''){
      $("#hubstock_ordertype_error").html("Please select Stock Type").show().fadeOut(2000);
     } 
     else if(this.quantity == undefined ||  this.quantity == ''){
      $("#hubstock_quantity_error").html("Please enter Quantity").show().fadeOut(2000);
      } else{
    var self = this;
    axios.post(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/stocks`,{
      "hubsid": self.hubsid,
      "productsid": self.selectedproduct,
      "stockstypesid": self.selectedstocktype,
      "quantity": self.quantity,
      "status": "1"
  })
        .then(function (response) {
          console.log(response);
          if(response){
            Swal.fire({
              position: 'top',
              type: 'success',
              title: 'Hub Stock is Added',
              showConfirmButton: false,
              timer: 1500
            })
          } 
          self.selectedproduct = '';
          self.selectedstocktype = '';
          self.quantity = '';
          self.hubStockTable();
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

     }

     
     gethubstockbyID(hubstockID){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/stocks/${hubstockID}`)
        .then(function (response) {
          console.log(response);
          self.hubsstocksid = response.data.hubsstocksid;
          self.selectedproduct = response.data.productsid;
          self.selectedstocktype = response.data.stockstypesid;
          self.quantity = response.data.quantity;
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  deletehubstock(hubstockID){
    var self = this;
    console.log(hubstockID);
    if(self.confirmClicked == true){
    axios.put(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/stocks/${hubstockID}`,{
      "status" : "0"
    })
        .then(function (response) {
          console.log(response);
  
          self.hubStockTable();
          self.confirmClicked = false;
          if(response){
            Swal.fire({
              position: 'top',
              type: 'success',
              title: 'Deleted Sucessfully',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
  }


  edithubstock(){
  
    if(this.selectedproduct== undefined || this.selectedproduct == ''){
      $("#hubstock_product_error").html("Please select Product").show().fadeOut(2000);
     }else if(this.selectedstocktype == undefined ||  this.selectedstocktype == ''){
      $("#hubstock_ordertype_error").html("Please select Stock Type").show().fadeOut(2000);
     } 
     else if(this.quantity == undefined ||  this.quantity == ''){
      $("#hubstock_quantity_error").html("Please enter Quantity").show().fadeOut(2000);
      } else{
    var self = this;
    axios.put(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/stocks/${self.hubsstocksid}`,{
      "hubsid": self.hubsid,
      "productsid": self.selectedproduct,
      "stockstypesid": self.selectedstocktype,
      "quantity": self.quantity,
      "status": "1"
    })
        .then(function (response) {
          console.log(response);
          if(response){
            Swal.fire({
              position: 'top',
              type: 'success',
              title: 'Hub Stock is Edited',
              showConfirmButton: false,
              timer: 1500
            })
          }
          $('#editclose').click();
          self.hubStockTable();
    })
        .catch(function (error) {
          console.log(error);
        });
        


  }
  }

}
