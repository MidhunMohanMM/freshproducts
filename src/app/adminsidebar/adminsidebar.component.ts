import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Router, NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
declare var require: any
import Swal from 'sweetalert2';
var $ = require("jquery");
import axios from "axios";
import { AppGlobals } from '../app.global';

import 'rxjs/add/observable/interval';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-adminsidebar',
  templateUrl: './adminsidebar.component.html',
  styleUrls: ['./adminsidebar.component.css'],
  providers: [AppGlobals]
})
export class AdminsidebarComponent implements OnInit {


  config:any;
  number: any;
  hubuserid: any;
  hubname: any;
  username: any;
  password: any;
  passwordconfirm: any;
  hubuserstypesid: any;
  factorytransfers: any;
  factorytransferslength: any;
  sub: any;
  hubs: any;
  userSubscription: Subscription;
  name: any;
  
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

    this.userSubscription = this.route.params.subscribe(
      (params: Params) => {
           console.log("hi");
          //  if(this.route.routeConfig.path == 'transfer/request/:id/:hubsid'){
          //   $( ".custom-transfer-color-menu" ).attr( 'style', 'background :#f5f8fa' );
          // }
})
    

    document.title = 'Chipo Admin | Share & Enjoy';
     console.log(this.route);
    if(this.route.routeConfig.path == 'admin/dashboard/:id'){
      $( ".custom-dashboard-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'bankpayin/:id'){
      $( ".custom-bankpayin-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'employee'){
      $( ".custom-employee-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'invoice'){
      $( ".custom-invoice-color-menu" ).attr( 'style', 'background :#f5f8fa' );

    }
    else if(this.route.routeConfig.path == 'order/place/:id'){
      $( ".custom-place-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'product/:id'){
      $( ".custom-product-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'route'){
      $( ".custom-route-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'hub/manage/:id'){
      $( ".custom-manage-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'van'){
      $( ".custom-van-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'vanstock'){
      $( ".custom-vanstock-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'preorder'){
      $( ".custom-preorder-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'waybill'){
      $( ".custom-waybill-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'shop'){
      $( ".custom-shop-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'spr/hub/stock/:id'){
      $( ".custom-stock-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'ewaybill/:id'){
      $( ".custom-ewaybill-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'transfer/request/:id'){
      $( ".custom-transfer-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'acceptstock/:id'){
      $( ".custom-acceptstock-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'vanroutelink/:id'){
      $( ".custom-vanroutelink-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'endtrip/:id'){
      $( ".custom-endtrip-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'products/:id'){
      $( ".custom-products-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'settings/:id'){
      $( ".custom-settings-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'order/items/:id'){
      $( ".custom-items-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'hub/stock/:id'){
      $( ".custom-stock-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'customers/:id'){
      $( ".custom-customers-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'factory/:id'){
      $( ".custom-factory-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'trip/details/:id'){
      $( ".custom-trips-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'admin/routes/:id'){
      $( ".custom-adminroutes-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'invoices/:id'){
      $( ".custom-invoices-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'hubroutelink/:id'){
      $( ".custom-hubroutelink-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'admin/new/shops/:id'){
      $( ".custom-shops-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    this.gethubuser();
    this.factorytransfer();
    this.getallhubs();

    this.sub = Observable.interval(3000)
    .subscribe((val) => { this.factorytransfer() });


  }

  changecredentials(){
    var self = this;

    if(self.username == undefined ||  self.username == ''){
      $("#username_error_hub").html("Please enter Username").show().fadeOut(2000);
     }
     else if(self.password == undefined ||  self.password == ''){
      $("#password_error_hub").html("Please Enter Password").show().fadeOut(2000);
     }
     else if(self.passwordconfirm == undefined ||  self.passwordconfirm == '' || self.passwordconfirm != self.password){
      $("#confirm_password_error_hub").html("Please confirm your password").show().fadeOut(2000);
      self.password = "";
      self.passwordconfirm = "";
     }else{

      console.log(self.username);
      console.log(self.password);
   
    axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/users/profiles/${self.hubuserid}`,{
        "username" : self.username,
        "password": self.password

    })
        .then(function (response) {
          console.log(response);
          if(response){
            Swal.fire({
              position: 'top',
              type: 'success',
              title: 'Credentials Edited',
              showConfirmButton: false,
              timer: 1500
            })
          } 
          // self.staffs = response.data;

        })
        .catch(function (error) {
          console.log(error);
        });

        $("#addclosehub").click();
        // self.getallhubusers();

     }
  }

  gethubuser(){
    var self = this;
    var hubsid = localStorage.getItem('Hubsid');
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/users/profiles/${ this.hubuserid}` )
       .then(function (res) {
          console.log(res);
          if(res.data.hub)
          self.hubname = res.data.hub.name;
          self.name = res.data.name;
          self.username = res.data.username;
          self.hubuserstypesid = res.data.hubsuserstypesid;
          console.log(self.hubuserstypesid);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  
factorytransfer(){
  var self = this;
  axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/factories/transfers?factoriestransfers[status]=1`)
      .then(function (response) {
        // console.log(response);
        self.factorytransfers = response.data;
        self.factorytransferslength = response.data.length;
        
      })
      .catch(function (error) {
        console.log(error);
      });
}

getallhubs(){
  var self = this;
  axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/profiles?hubs[status]=1`)
      .then(function (response) {
        // console.log(response);
        self.hubs = response.data;
        
      })
      .catch(function (error) {
        console.log(error);
      });
}


}
