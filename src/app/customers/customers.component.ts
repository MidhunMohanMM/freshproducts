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
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [AppGlobals]
})
export class CustomersComponent implements OnInit {

  hubStock:any =[];
  order:any = "";
  vans: any;
  search1:any = "";
  selectedorder: any = "";
  key: string = 'name'; //set default
  reverse: boolean ;
  hubuserid: string;
  hubname: any;
  username: any;
  hubusertypeid: any;
  number: any;
  customers: any;
  routes: any;
  selectedroute: any = "";
  position: any = "";
  name: any = "";
  address1: any = "";
  address2: any = "";
  phone: any = "";
  mobile: any = "";
  gst_no: any = "";
  public popoverTitle: string = 'Delete Customer';
  public popoverMessage: string = 'Are you really <b>sure</b> you want to do this?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  customersid: any;
  public p: any;
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
    this.getcustomers();
    this.gethubuser();
    this.getroutes();
  }

  getcustomers(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/customers/profiles?customers[status]=1`)
        .then(function (res) {
          console.log(res);
          self.customers = res.data
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getcustomerbyID(customerID){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/customers/profiles/${customerID}`)
        .then(function (response) {
          console.log(response);
         self.customersid = response.data.customersid;
         self.selectedroute = response.data.routesid;
         self.name = response.data.name;
        self.position = response.data.position;
        self.address1 = response.data.address1;
        self.address2 = response.data.address2;
        self.phone = response.data.phone;
        self.mobile = response.data.mobile;
        self.gst_no = response.data.gst_no;

      
        })
        .catch(function (error) {
          console.log(error);
        });
        
  }
  
  deletecustomer(customerID){
    var self = this;
    console.log(customerID);
    if(self.confirmClicked == true){
    axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/customers/profiles/${customerID}`,{
      "status" : "0"
    })
        .then(function (response) {
          console.log(response);
  
          self.getcustomers();
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

  editcustomers(){
  
    if(this.selectedroute== undefined || this.selectedroute == ''){
      $("#customer_route_error").html("Please select route").show().fadeOut(2000);
     }else if(this.name == undefined ||  this.name == ''){
      $("#customer_name_error").html("Please enter Customer Name").show().fadeOut(2000);
     } 
     else if(this.address1 == undefined ||  this.address1 == ''){
      $("#customer_address1_error").html("Please enter Street Name").show().fadeOut(2000);
     } 
     else if(this.address2 == undefined ||  this.address2 == ''){
      $("#customer_address2_error").html("Please enter Place").show().fadeOut(2000);
     } 
     else if(this.gst_no == undefined ||  this.gst_no == ''){
      $("#customer_gst_no_error").html("Please enter GST Number").show().fadeOut(2000);
     } 
     else if(this.mobile == undefined ||  this.mobile == ''){
      $("#customer_mobile_error").html("Please enter mobile number").show().fadeOut(2000);
     } 
     else if(this.phone == undefined ||  this.phone == ''){
      $("#customer_phone_error").html("Please enter phone").show().fadeOut(2000);
     } 
     else if(this.position == undefined ||  this.position == ''){
      $("#customer_position_error").html("Please enter position").show().fadeOut(2000);
     } else{
     var self = this;
    axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/customers/profiles/${self.customersid}`,{
      "routesid": self.selectedroute,
      "crmid": 1,
      "position": self.position,
      "name": self.name,
      "address1": self.address1,
      "address2": self.address2,
      "phone": self.phone,
      "mobile": self.mobile,
      "gst_no": self.gst_no,
      "status": "1"
    })
        .then(function (response) {
          console.log(response);
          if(response){
            Swal.fire({
              position: 'top',
              type: 'success',
              title: 'Customer is Edited',
              showConfirmButton: false,
              timer: 1500
            })
          }
          $('#editclose').click();
          self.getcustomers();
    })
        .catch(function (error) {
          console.log(error);
        });
        
  }
  }

  addcustomers(){
    if(this.selectedroute== undefined || this.selectedroute == ''){
      $("#customer_route_error").html("Please select route").show().fadeOut(2000);
     }else if(this.name == undefined ||  this.name == ''){
      $("#customer_name_error").html("Please enter Customer Name").show().fadeOut(2000);
     } 
     else if(this.address1 == undefined ||  this.address1 == ''){
      $("#customer_address1_error").html("Please enter Street Name").show().fadeOut(2000);
     } 
     else if(this.address2 == undefined ||  this.address2 == ''){
      $("#customer_address2_error").html("Please enter Place").show().fadeOut(2000);
     } 
     else if(this.gst_no == undefined ||  this.gst_no == ''){
      $("#customer_gst_no_error").html("Please enter GST Number").show().fadeOut(2000);
     } 
     else if(this.mobile == undefined ||  this.mobile == ''){
      $("#customer_mobile_error").html("Please enter mobile number").show().fadeOut(2000);
     } 
     else if(this.phone == undefined ||  this.phone == ''){
      $("#customer_phone_error").html("Please enter phone").show().fadeOut(2000);
     } 
     else if(this.position == undefined ||  this.position == ''){
      $("#customer_position_error").html("Please enter position").show().fadeOut(2000);
     } else{
     var self = this;
     axios.post(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/customers/profiles`,{
      "routesid": self.selectedroute,
      "crmid": 1,
      "position": self.position,
      "name": self.name,
      "address1": self.address1,
      "address2": self.address2,
      "phone": self.phone,
      "mobile": self.mobile,
      "gst_no": self.gst_no,
      "status": "1"
  })
         .then(function (res) {
           console.log(res);     
           if(res){
             Swal.fire({
               position: 'top',
               type: 'success',
               title: 'Customer is Added',
               showConfirmButton: false,
               timer: 1500
             })
           } 
           self.selectedroute = '';
           self.position = '';
           self.name = '';
           self.address1 = '';
           self.address2 = '';
           self.phone = '';
           self.mobile = '';
           self.gst_no = '';
           self.getcustomers();
         })
         .catch(function (error) {
           console.log(error);
         });
   }
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

  getroutes(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/routes/profiles`)
        .then(function (res) {
          console.log(res);
          self.routes = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  


}
