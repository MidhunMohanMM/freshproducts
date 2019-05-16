import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {ActivatedRoute} from '@angular/router';
import { NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { AppGlobals } from '../app.global';

import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-acceptstock',
  templateUrl: './acceptstock.component.html',
  styleUrls: ['./acceptstock.component.css'],
  providers: [AppGlobals]
})
export class AcceptstockComponent implements OnInit {

  hub: any = "";
  accept: any  = "Accept";
  reject: any = "Reject";
  search1: any = "";
  i: any = "0";

  key: string = 'productname'; //set default
  reverse: boolean = false;
  number: any;
  hubuserid: any;
  hubname: any;
  username: any;
  hubusertypeid: any;
  factorytransfers: any;
  factorytransferlength: any;
  hubsid: string;
  factorytransferid: any;
  editquantity: any;
  editfactorytransfersid: any;
  invoices: any;
  loading: boolean = true;
  previouseditquantity: any;
  sub: any;
  acceptstockflag: boolean = false;
  quantity: any;
  factorystocks: any;
  productsid: any;
  previousstock: any;
  factoriesstocksid: any;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  acceptbtn(id){
    this.factorytransferid = id;
    console.log(this.factorytransferid);
    this.factorytransferapproval();
    if(this.accept == 'Edit'){
      this.reject = "Reject";
      this.accept = "Accept";
    }
 else{
  this.accept = "Accepted";
        this.reject = "Edit";
 }
   
    

     
  
 
      // this.accept = "Accepted";
      // this.reject = "Rejected";

    // this.i ++;
    // console.log(this.i)
  }

  rejectbtn(id){
    this.factorytransferid = id;
    this.factorytransferreject();
    if(this.reject == 'Edit'){
      this.reject = "Reject";
      this.accept = "Accept";
    }

    else{
      this.reject = "Rejected";
      this.accept = "Edit";
    }
    

 
 
  }

  constructor(  private route : ActivatedRoute ,  private router: Router, private _location: Location, private _global: AppGlobals) {
    this.route.params.subscribe(params => {
      console.log(params);
      this.number = params;
      this.hubuserid = this.number.id;
      console.log(this.hubuserid);
      });
   }


  ngOnInit() {
    console.log(this.accept);
    this.gethubuser();


    //  this.getacceptstock();
    this.sub = Observable.interval(3000)
    .subscribe((val) => { this.getacceptstock() });


  }

  
  gethubuser(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/users/profiles/${ this.hubuserid}` )
    .then(function (res) {
     
          console.log(res);
          self.hubsid = res.data.hub.hubsid
          self.hubname = res.data.hub.name;
          self.username = res.data.name;
          self.hubusertypeid = res.data.hubsuserstypesid;
          self.getacceptstock();
          if(self.hubusertypeid == '1'){
            self.router.navigate(['']);
          }
         
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  gettransferreqbyID(tranferrequestID){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/factories/transfers/${tranferrequestID}`)
        .then(function (response) {
          console.log(response);
          self.editquantity = response.data.quantity;
          self.previouseditquantity = self.editquantity;
          self.editfactorytransfersid = response.data.factoriestransfersid;
          // self.invoices.push(response.data);
          self.productsid = response.data.productsid;
          self.getfactorystockbyID();
         
      })
        .catch(function (error) {
          console.log(error);
        });
  }

  getfactorystockbyID(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/stocks?products[productsid]=${self.productsid}`)
        .then(function (response) {
          console.log(response);
        
          for(let key in response.data){
            response.data[key].productname = response.data[key].product.name;
          }
          self.factorystocks = response.data;
          self.previousstock = response.data[0].stock;
          self.factoriesstocksid = response.data[0].factoriesstocksid
          self.quantity = self.previousstock - self.editquantity;
          console.log(self.editquantity);
          console.log(self.previousstock);
          self.editfactorystock(); 
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  acceptall(){
    var self = this;
  console.log(self.factorytransferlength);
    for(var i = 0; i<self.factorytransferlength; i++){
  
  
   console.log(self.factorytransfers[i].factoriestransfersid);
    axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/complete/transfers/${self.factorytransfers[i].factoriestransfersid}`)
        .then(function (response) {
          console.log(response);  
          self.acceptstockflag = false;
        })
        .catch(function (error) {
          console.log(error);
        });
  
      }
      self.getacceptstock(); 
  }

  editfactorystock(){
    var self = this;

    console.log(self.quantity);

    console.log(self.factoriesstocksid);
    axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/stocks/${self.factoriesstocksid}`,{
      "stock" : self.quantity
    })
        .then(function (response) {
          console.log(response);
      
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getfactorystock(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/stocks`)
        .then(function (response) {
          console.log(response);
        
          for(let key in response.data){
            response.data[key].productname = response.data[key].product.name;
          }
          self.factorystocks = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getacceptstock(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/factories/transfers?factoriestransfers[status]=2&hubs[hubsid]=${self.hubsid}`)
        .then(function (response) {
          self.loading = false;
          if(response.data.length != 0){
            self.acceptstockflag = true;
          }

          // console.log(response);
          self.factorytransfers = response.data;
          self.factorytransferlength = response.data.length;
          for(let key in response.data){
            response.data[key].productname =  response.data[key].product.name;
          }
        })
        .catch(function (error) {
          console.log(error);
        });

}

factorytransferreject(){
  var self = this;
  console.log(self.factorytransferid);
  axios.put(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/factories/reject/transfers/${self.factorytransferid}`)
      .then(function (response) {
        console.log(response);   
      
            
        if(response){
          Swal.fire({
            position: 'top',
            type: 'success',
            title: 'Stock rejected',
            showConfirmButton: false,
            timer: 1500
          })
        }
      self.getacceptstock(); 
      })
      .catch(function (error) {
        console.log(error);
      });
}



factorytransferapproval(){
  var self = this;
  console.log(self.factorytransferid);
  axios.put(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/factories/complete/transfers/${self.factorytransferid}`)
      .then(function (response) {
        console.log(response);  
        if(response){
          Swal.fire({
            position: 'top',
            type: 'success',
            title: 'Stock Accepted',
            showConfirmButton: false,
            timer: 1500
          })
        } 
        self.getacceptstock(); 
        self.gettransferreqbyID(self.factorytransferid);
      })
      .catch(function (error) {
        console.log(error);
      });
}

editedtransferreq(){
  var self = this;
  console.log(self.editfactorytransfersid);
  if(self.editquantity > self.previouseditquantity){
      Swal.fire({
        position: 'top',
        type: 'warning',
        title: 'Quantity cannot be more than requested',
        showConfirmButton: false,
        timer: 1500
      })
  } 
  if(self.editquantity == self.previouseditquantity){

    $("#editclose").click();
  }
  else{
    axios.put(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/factories/transfers/${self.editfactorytransfersid}`,{
      "quantity" : self.editquantity
  })
      .then(function (response) {
        console.log(response);  
        if(response){
          Swal.fire({
            position: 'top',
            type: 'success',
            title: 'Quantity Edited',
            showConfirmButton: false,
            timer: 1500
          })
        } 
        self.getacceptstock(); 
        $("#editclose").click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}



}