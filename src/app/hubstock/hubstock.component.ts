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
          self.hubStockTable();
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  hubStockTable(){
    var self = this;
    console.log(self.hubsid);
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/stocks?hubs[hubsid]=${self.hubsid}&hubsstocks[status]=1`)
        .then(function (res) {
          self.loading = false;
          if(res.data.length != 0){
            self.hubstockflag = true;
          }
         console.log(res.data);
        for (let key in res.data){
          res.data[key].productname = res.data[key].product.name;
          res.data[key].stocktypename = res.data[key].stocks_type.name;
        }
        console.log(res.data);
          self.hubStock = res.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
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
