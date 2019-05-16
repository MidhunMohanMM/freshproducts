import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router, NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
import axios from "axios";
import { AppGlobals } from '../app.global';

import $ from "jquery";


import Swal from 'sweetalert2';

@Component({
  selector: 'app-sprhubstock',
  templateUrl: './sprhubstock.component.html',
  styleUrls: ['./sprhubstock.component.css'],
  providers: [AppGlobals]
})
export class SprhubstockComponent implements OnInit {

  hubStock:any =[];
  order:any = "";
  vans: any;
  search1:any = "";
  selectedorder: any = "";
  flag: any = false;
  key: string = 'productname'; //set default
  reverse: boolean ;
  hubuserid: string;
  hubname: any;
  selecthub:any = "";
  username: any;
  hubusertypeid: any;
  number: any;
  products: any;
  selectedproduct: any = "";
  selectedstocktype: any = "";
  selectedhub: any = "";
  quantity: any = "";
  productquantity:any
  hubsid: any;
  hubs:any = "";
  hub1: any = "";
  stocktypes: any;
  public popoverTitle: string = 'Delete Hub Stock';
  public popoverMessage: string = 'Are you really <b>sure</b> you want to do this?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  hubsstocksid: any;
  hu: string;
  selectedcustomer: any;
  promoted: any;
  regularly: any;
  public p: any;
  pruductname:any
  producttype:any
  productname: any;
  singlehubStock: any;
  loading: boolean = true;
  hubmulti: any = [];
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; allowSearchFilter: boolean; };
  europe: { item_id: number; item_text: string; }[];
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

    
  constructor(  private route : ActivatedRoute ,  private router: Router, private _location: Location, private _global: AppGlobals) {
    this.route.params.subscribe(params => {
      this.number = params;
      this.hubuserid = this.number.id;
      //this.eid = this.number.id2;
     // console.log(this.eid);
  
      });
   }


  ngOnInit() {
    this.gethubuser();
    this.getallhubs();
    
    this.getstocktypes();
    this.getproducts();

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      
      allowSearchFilter: true
    };

    this.europe = [
      { item_id: 1, item_text: 'Southern Europe' },
      { item_id: 2, item_text: 'Western Europe' },
      { item_id: 3, item_text: 'Eastern Europe' },
      { item_id: 4, item_text: 'Northern Europe' },
     ];

     console.log(this.europe);
  
  }


  onItemSelect(item: any) {
    console.log(item);

  }
  onSelectAll(items: any) {
    console.log(items);
  }


  gethubuser(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/users/profiles/${ this.hubuserid}`)
    .then(function (res) {
          self.hubsid = res.data.hubsid;
          if(res.data.hub)
          self.hubname = res.data.hub.name;
          self.username = res.data.name;
          self.hubusertypeid = res.data.hubsuserstypesid;
          if(self.hubusertypeid != '1'){
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
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/stocks?&hubsstocks[status]=1`)
        .then(function (res) {
          self.loading = false;
        for (let key in res.data){
          res.data[key].productname = res.data[key].product.name;
          res.data[key].hubname = res.data[key].hub.name;
          res.data[key].stocktypename = res.data[key].stocks_type.name;
        }
          self.hubStock = res.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getproductbyordertype(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/stocks?hubsstocks[stockstypesid]=${self.selectedorder}` )
        .then(function (response) {
          for (let key in response.data){
            response.data[key].productname = response.data[key].product.name;
            response.data[key].hubname = response.data[key].hub.name;
            response.data[key].stocktypename = response.data[key].stocks_type.name;
          }
          self.hubStock = response.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getproducts(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/products/profiles?products[status]=1` )
        .then(function (response) {
          self.products = response.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getstocktypes(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/stocks/types` )
        .then(function (response) {
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
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/stocks${hubstockID}`)
        .then(function (response) {
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
    if(self.confirmClicked == true){
    axios.put(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/stocks/${hubstockID}`,{
      "status" : "0"
    })
        .then(function (response) {
  
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

  getallhubs(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/profiles?hubs[status]=1`)
        .then(function (res) {

          
          console.log(res);
          self.hubs = res.data;
        console.log(self.hubs);
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  gethubstocktable(){
    var self = this;
    console.log(this.selecthub);
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/stocks?hubs[hubsid]=${this.selectedhub}`)
        .then(function (res) {
      console.log(res);
      for (let key in res.data){
        res.data[key].productname = res.data[key].product.name;
        res.data[key].hubname = res.data[key].hub.name;
        res.data[key].stocktypename = res.data[key].stocks_type.name;
      }
      self.hubStock = res.data;
        
          // self.productname = res.data.product.name;
          // self.productquantity = res.data.quantity;
          // self.producttype = res.data.stocks_type.name;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

}
