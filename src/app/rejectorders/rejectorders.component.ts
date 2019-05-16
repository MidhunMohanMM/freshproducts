import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {ActivatedRoute} from '@angular/router';
import { NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import Swal from 'sweetalert2';


import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rejectorders',
  templateUrl: './rejectorders.component.html',
  styleUrls: ['./rejectorders.component.css']
})
export class RejectordersComponent implements OnInit {

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
  factorytransfers1: any;
  factorytransferlength: any;
  hubsid: string;
  factorytransferid: any;
  editquantity: any;
  editfactorytransfersid: any;
  invoices: any;
  previouseditquantity: any;
  sub: any;
  public p: any;
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

  constructor(  private route : ActivatedRoute ,  private router: Router, private _location: Location) {
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


    
    this.sub = Observable.interval(1000)
    .subscribe((val) => { this.getrejectedorders() });


  }

  
  gethubuser(){
    var self = this;
    axios.get('http://103.214.233.141:2981/v1/secure/hubs/users/profiles/' + this.hubuserid)
        .then(function (res) {
          console.log(res);
          self.hubsid = res.data.hub.hubsid
          self.hubname = res.data.hub.name;
          self.username = res.data.name;
          self.hubusertypeid = res.data.hubsuserstypesid;
          if(self.hubusertypeid == '1'){
            self.router.navigate(['']);
          }
          self.getrejectedorders();
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  gettransferreqbyID(tranferrequestID){
    var self = this;
    axios.get('http://103.214.233.141:2981/v1/secure/factories/transfers/' + tranferrequestID)
        .then(function (response) {
          console.log(response);
          self.editquantity = response.data.quantity;
          self.previouseditquantity = self.editquantity;
          self.editfactorytransfersid = response.data.factoriestransfersid;
          self.invoices.push(response.data);
          // console.log(self.invoices);
          // self.invhubname = response.data.hub.name;
          // self.hubaddress1 = response.data.hub.address1;
          // self.hubaddress2 = response.data.hub.address2;
      })
        .catch(function (error) {
          console.log(error);
        });
  }

  getrejectedorders(){
    var self = this;
    axios.get('http://103.214.233.141:2981/v1/secure/factories/transfers?factoriestransfers[status]=4&hubs[hubsid]=' + self.hubsid)
        .then(function (response) {
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
  axios.put('http://103.214.233.141:2981/v1/secure/factories/reject/transfers/' + self.factorytransferid)
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
      self.getrejectedorders(); 
      })
      .catch(function (error) {
        console.log(error);
      });
}

factorytransferapproval(){
  var self = this;
  console.log(self.factorytransferid);
  axios.put('http://103.214.233.141:2981/v1/secure/factories/complete/transfers/' + self.factorytransferid)
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
        self.getrejectedorders(); 
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
    axios.put('http://103.214.233.141:2981/v1/secure/factories/transfers/' + self.editfactorytransfersid,{
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
        self.getrejectedorders(); 
        $("#editclose").click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}



}