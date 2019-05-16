import { Component, OnInit } from '@angular/core';
import axios from "axios";

import {ActivatedRoute} from '@angular/router';
import { NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

import { AppGlobals } from '../app.global';
import * as $ from 'jquery';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-orderitems',
  templateUrl: './orderitems.component.html',
  styleUrls: ['./orderitems.component.css'],
  providers: [AppGlobals]
})
export class OrderitemsComponent implements OnInit {
  hubStock:any =[];
  order:any = "";
  vans: any;
  search1:any = "";
  selectedorder: any = "";
  key: string = 'customername'; //set default
  reverse: boolean ;
  orderitems: any = [];
  number: any;
  hubuserid: any;
  hubname: any;
  public p: any;
  username: any;
  hubusertypeid: any;
  selectedcustomer : any = "";
  selectedproduct: any = "";
  customers: any;
  products: any;
  productsid: any;
  customersid: any;
  promote: boolean = false;
  regular: boolean = false;
  promoted: string;
  regularly: string;
  ordersitemsid: any;
  address1: any;
  loading: boolean = true;
  address2: any;
  hubsid: string;
  limit: any = 15;
  public popoverTitle: string = 'Delete Order Item';
  public popoverMessage: string = 'Are you really <b>sure</b> you want to do this?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  offset: any = 0;
  fullorderitems: any = [];
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  
  constructor(private route : ActivatedRoute ,  private router: Router, private _location: Location, private _global: AppGlobals) {
    this.route.params.subscribe(params => {
      console.log(params);
      this.number = params;
      this.hubuserid = this.number.id;
      console.log(this.hubuserid);
      });
   }

  ngOnInit() {
    this.getallorderitems();
    this.gethubuser();
    this.getcustomerprofile();
    this.getproducts();
  }

  
  gethubuser(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/users/profiles/${this.hubuserid}`)
        .then(function (res) {
          console.log(res);
          self.hubname = res.data.hub.name;
          self.username = res.data.name;
          self.hubusertypeid = res.data.hubsuserstypesid;
          if(self.hubusertypeid != '1'){
            self.router.navigate(['']);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  
  
  getallorderitems(){
    var self = this;
    console.log(self.offset);
    console.log(self.limit);
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/customers/orders/items?ordersitems[status]=1&offset=${self.offset}&limit=${self.limit}`)
        .then(function (res) {
          self.loading = false;
          console.log(res);
          for (let key in res.data){
            res.data[key].productname = res.data[key].product.name;
            res.data[key].customername = res.data[key].customer.name;
            self.orderitems.push(res.data[key]);
          }
          

          if(self.offset == 0){
              self.offset = self.offset + 15;
          }
          else{
            self.offset = self.offset + 3000;
          }
           self.limit = 3000;

          console.log(self.orderitems);
          console.log(res.data);
          if(res.data.length != 0){
            self.getallorderitems();
          }  
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  
  getcustomerprofile(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/customers/profiles`)
        .then(function (res) {
          console.log(res);
          self.customers = res.data;        
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getproducts(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/products/profiles`)
        .then(function (res) {
          console.log(res);
          self.products = res.data;        
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  addorderitem(){

    console.log(this.regular);
    console.log(this.promote);
    if(this.promote == false){
      this.promoted = "0";
    }
    else{
      this.promoted = "1";
    }
    if(this.regular == false){
      this.regularly = "0";
    }
    else{
      this.regularly = "1";
    }
    if(this.selectedcustomer== undefined || this.selectedcustomer == ''){
     $("#order_item_customer_error").html("Please select customer").show().fadeOut(2000);
    }else if(this.selectedproduct == undefined ||  this.selectedproduct == ''){
     $("#order_item_product_error").html("Please select product").show().fadeOut(2000);
    } else{
    var self = this;
    // console.log("hi");
    console.log(self.selectedcustomer);
    console.log(self.selectedproduct);
    axios.post(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/customers/orders/items`,{
      "productsid": self.selectedproduct,
      "customersid": self.selectedcustomer,
      "promote": self.promoted,
      "regular": self.regularly,
      "status": "1"
    })
        .then(function (res) {
          console.log(res);     
          if(res){
            Swal.fire({
              position: 'top',
              type: 'success',
              title: 'Order Item is Added',
              showConfirmButton: false,
              timer: 1500
            })
          } 
          self.selectedproduct = '';
          self.selectedcustomer = '';
          self.getallorderitems();
        })
        .catch(function (error) {
          console.log(error);
        });
  }
}


getorderitembyID(ordersitemsID){
  var self = this;
  axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/customers/orders/items/${ordersitemsID}`)
      .then(function (response) {
        console.log(response);
       self.hubname = response.data.name;
       self.selectedcustomer = response.data.customer.customersid;
       self.selectedproduct = response.data.productsid;
      self.ordersitemsid = response.data.ordersitemsid;
      console.log(self.selectedcustomer);
      console.log(self.selectedproduct);
      if(response.data.promote == "0"){
        self.promote = false;
      }
      else{
        self.promote = true;
      }
      if(response.data.regular == "0"){
        self.regular = false;
      }
      else{
        self.regular = true;
      }
      console.log(self.promote);
      console.log(self.regular);
    
      })
      .catch(function (error) {
        console.log(error);
      });
      
}

deleteorderitem(ordersitemsID){
  var self = this;
  console.log(ordersitemsID);
  if(self.confirmClicked == true){
  axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/customers/orders/items/${ordersitemsID}`,{
    "status" : "0"
  })
      .then(function (response) {
        console.log(response);

        self.getallorderitems();
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

editorderitem(){
  
  console.log(this.regular);
  console.log(this.promote);
  if(this.promote == false){
    this.promoted = "0";
  }
  else{
    this.promoted = "1";
  }
  if(this.regular == false){
    this.regularly = "0";
  }
  else{
    this.regularly = "1";
  }

  if(this.selectedcustomer== undefined || this.selectedcustomer == ''){
    $("#edit_hub_name_error").html("Please enter name").show().fadeOut(2000);
   }else if(this.selectedproduct == undefined ||  this.selectedproduct == ''){
    $("#edit_hub_location_error").html("Please enter location").show().fadeOut(2000);
   }else{
  var self = this;
  axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/customers/orders/items/${self.ordersitemsid}`,{
    "productsid": self.selectedproduct,
    "customersid": self.selectedcustomer,
    "promote": self.promoted,
    "regular": self.regularly,
    "status": "1"
  })
      .then(function (response) {
        console.log(response);
        if(response){
          Swal.fire({
            position: 'top',
            type: 'success',
            title: 'Order Item is Edited',
            showConfirmButton: false,
            timer: 1500
          })
        }
        $('#editclose').click();
        self.getallorderitems();
  })
      .catch(function (error) {
        console.log(error);
      });
      
}
}



}
