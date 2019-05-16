import { Component, OnInit } from '@angular/core';
declare var $:any;
import axios from "axios";

import {ActivatedRoute} from '@angular/router';
import { NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { AppGlobals } from '../app.global';

@Component({
  selector: 'app-endtrip',
  templateUrl: './endtrip.component.html',
  styleUrls: ['./endtrip.component.css'],
  providers: [AppGlobals]
})
export class EndtripComponent implements OnInit {

  // route:any = "";
  selectedroute: any = "";
  select1: any = "-------"
  select2: any = "-------"

  btn:any= "End Trip";
  select2btn:any= "End Trip";

  receivedcash: any = ";"
  showreceived: boolean = false;
  items: any = [];
  Arr = Array; //Array type captured in a variable
  num:number = 20;
  vans: any;
  routes: any;
  hubuserid: string;
  hubname: any;
  username: any;
  hubusertypeid: any;
  number: any;
  dropdownSettingsofroute = {};
  vansid: any;
  selectvan: any;
  loading: boolean = true;

  constructor(  private route : ActivatedRoute ,  private router: Router, private _location: Location, private _global: AppGlobals) {
    this.route.params.subscribe(params => {
      console.log(params);
      this.number = params;
      this.hubuserid = this.number.id;
      console.log(this.hubuserid);
      });
   }

  ngOnInit() {

    $('.carousel').carousel({  
      interval: 2000
    }); 

      this.getallroutes();
      this.getallvans();
      this.gethubuser();
      
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
    this.getvanbyroute();
    // this.selectedroute = item.name;
  }

  onItemSelect(item: any) {
    console.log(item);
    this.getvanbyroute();
    // this.selectedroute = item.name;
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  
  gethubuser(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/users/profiles/${ this.hubuserid}` )
    .then(function (res) {
          console.log(res);
          self.hubname = res.data.hub.name;
          self.username = res.data.name;
          self.hubusertypeid = res.data.hubsuserstypesid;
          if(self.hubusertypeid == '1'){
            self.router.navigate(['']);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  }


  endtrip(vanid){
    
    var self = this;

    $('html,body').animate({ scrollTop: 350 }, 600)


    this.showreceived = true;
    // this.btn = "Trip Ended";

    // axios.put(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/vans/profiles/${vanid}`,{
    //   "status" : "3"
    // })
    //     .then(function (res) {
    //       console.log(res);
    //       self.getallvans();
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
      
  }

  getallroutes(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/routes/profiles?routes[status]=1`)
        .then(function (res) {
          console.log(res);
          self.routes = res.data;   
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  
  getallvans(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/vans/profiles?routes[status]=1&vans[status]=2`)
        .then(function (res) {
          self.loading = false;
          console.log(res);
          self.vans = res.data; 
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getvanbyroute(){
    var self = this;
    console.log(self.selectedroute);
    if(self.selectedroute.length != 0){
      axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/vans/profiles?routes[routesid]=${self.selectedroute[0].routesid}&routes[status]=1` )
      .then(function (response) {
        console.log(response);
        self.vansid = response.data.vansid;
        self.selectvan = response.data.vansid;
  
        for (let key in response.data){
          if(response.data[key].route != null){
            response.data[key].routename = response.data[key].route.name;
          }
          else{
            response.data[key].routename = "Route Not Assigned"
          }
  
        }
        self.vans = response.data; 
  
  
        // self.selectedroute = response.data.routesid;
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else{
      self.getallvans();
    }
  
  }
  


}
