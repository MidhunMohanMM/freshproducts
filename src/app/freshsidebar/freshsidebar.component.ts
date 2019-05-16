import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router, NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
declare var require: any
var $ = require("jquery");
import axios from "axios";
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs';
import { AppGlobals } from '../app.global';

@Component({
  selector: 'app-freshsidebar',
  templateUrl: './freshsidebar.component.html',
  styleUrls: ['./freshsidebar.component.css'],
  providers: [AppGlobals]
})
export class FreshsidebarComponent implements OnInit {

  config:any;
  number: any;
  hubuserid: any;
  hubname: any;
  username: any;
  hubuserstypesid: any;
  factorytransfers: any;
  factorytransferslength: any;
  factoryrejectlength: any;
  hubsid: any;
  sub: any;
  
  
  constructor(  private route : ActivatedRoute ,  private router: Router, private _location: Location, private _global: AppGlobals) {
    this.route.params.subscribe(params => {
      console.log(params);
      this.number = params;
      this.hubuserid = this.number.id;
      //this.eid = this.number.id2;
      console.log(this.hubuserid);
     // console.log(this.eid);
  console.log(this._global.baseUrl)
      });
   }

  ngOnInit() {
    document.title = 'Chipo Hub Manager | Share & Enjoy';

     console.log(this.route);
    if(this.route.routeConfig.path == 'hub/dashboard/:id'){
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
    else if(this.route.routeConfig.path == 'ewaybill/:id'){
      $( ".custom-ewaybill-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'tranfer/request/:id'){
      $( ".custom-transfer-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'acceptstock/:id'){
      $( ".custom-acceptstock-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'rejectorders/:id'){
      $( ".custom-rejectorders-color-menu" ).attr( 'style', 'background :#f5f8fa' );
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
    else if(this.route.routeConfig.path == 'customer/orders/:id'){
      $( ".custom-customer-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'hub/routes/:id'){
      $( ".custom-hubroutes-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'hub/factory/:id'){
      $( ".custom-factory-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'vanroutelink/:id'){
      $( ".custom-vanroutelink-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'new/shops/:id'){
      $( ".custom-shops-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    else if(this.route.routeConfig.path == 'hub/ewaybill/:id'){
      $( ".custom-ewaybill-color-menu" ).attr( 'style', 'background :#f5f8fa' );
    }
    this.gethubuser();

    
    this.sub = Observable.interval(3000)
    .subscribe((val) => { this.factorytransfer() });

  }

  gethubuser(){
    var self = this;
    var hubsid = localStorage.getItem('Hubsid');
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/users/profiles/${ this.hubuserid}` )
        .then(function (res) {
          console.log(res);
          self.hubsid = res.data.hubsid
          self.hubname = res.data.hub.name;
          self.username = res.data.name;
          self.hubuserstypesid = res.data.hubsuserstypesid;
          console.log(self.hubuserstypesid);
          self.factorytransfer();
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  factorytransfer(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/factories/transfers?factoriestransfers[status]=2&hubs[hubsid]=${self.hubsid}`)
        .then(function (response) {
          //  console.log(response);
          self.factorytransfers = response.data;
          self.factorytransferslength = response.data.length;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

}
