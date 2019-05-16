import { Component, OnInit } from '@angular/core';
import axios from "axios";
import * as $ from 'jquery';
import Swal from 'sweetalert2';

import {ActivatedRoute} from '@angular/router';
import { NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { CollectionComponent } from '../collection/collection.component';
import { AppGlobals } from '../app.global';

@Component({
  selector: 'app-vanroutelink',
  templateUrl: './vanroutelink.component.html',
  styleUrls: ['./vanroutelink.component.css'],
  providers: [AppGlobals]
})
export class VanroutelinkComponent implements OnInit {


  selectedroute: any = "";
  select1: any = "-------"
  select2: any = "-------"
  selectRoutes:any ="";
  select1btn:any= "Select this Van";
  select2btn:any= "Select this Van";
  routes: any;
  vans: any;
  stockitem: any;
  number: any;
  hubuserid: any;
  hubname: any;
  username: any;
  hubusertypeid: any;
  routeselect: any = "";
  selectvan:any ="";
  public popoverTitle: string = 'Delete ';
  public popoverMessage: string = 'Are you really <b>sure</b> you want to do this?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  key: any = "name";
  reverse: boolean;
  public p: any;
  search1: any = "";
  vansid: any;
  loading: boolean = true;
  dropdownSettingsofroute = {};
  hubsid: any;

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
    
    this.getallvans();
    this.gethubuser();

    this.dropdownSettingsofroute = {
      singleSelection: true,
      idField: 'routesid',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      closeDropDownOnSelection: true,
      allowSearchFilter: true
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
          self.hubsid = res.data.hubsid;
          self.hubname = res.data.hub.name;
          self.username = res.data.name;
          self.hubusertypeid = res.data.hubsuserstypesid;
          if(self.hubusertypeid == '1'){
            self.router.navigate(['']);
          }
          self.getallroutes();
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  changevanroute1(){

    if(this.select1btn == "Change Route"){
      this.select1btn = "Select this Van";
      this.select1 = "-------";
    }
    else{
      this.select1 = this.routeselect;
      this.select1btn = "Change Route"
    }
      
  }
  changevanroute2(){
    if(this.select2btn == "Change Route"){
      this.select2btn = "Select this Van";
      this.select2 = "-------";
    }
    else{
      this.select2 = this.routeselect;
      this.select2btn = "Change Route"
    }
}

getallroutes(){
  var self = this;
  axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/routes/profiles?routes[status]=1&hubs[hubsid]=${self.hubsid}`)
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
  axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/vans/profiles?routes[status]=1`)
      .then(function (res) {
        self.loading = false;
        console.log(res);
        for (let key in res.data){
          if(res.data[key].route != null){
            res.data[key].routename = res.data[key].route.name;
          }
          else{
            res.data[key].routename = "Route Not Assigned"
          }

        }
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

getvanbyID(vansID){
  var self = this;
  console.log(self.selectedroute);
  axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/vans/profiles/${vansID}` )
      .then(function (response) {
        console.log(response);
        self.vansid = response.data.vansid;
        self.selectvan = response.data.vansid;
        self.selectedroute = response.data.routesid;
        
      })
      .catch(function (error) {
        console.log(error);
      });
}

editVanRoute(){
  var self = this;
 
  if(this.selectvan == undefined ||  this.selectvan == ''){
    $("#select_van_error").html("Please select van").show().fadeOut(2000);
   }else if(this.selectRoutes == undefined ||  this.selectRoutes == ''){
    $("#select_route_error").html("Please select route").show().fadeOut(2000);
   }else{
       //  console.log(hub_info);
    axios.put(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/vans/profiles/${self.vansid}`,{
      "routesid": this.selectRoutes,
      "status" : "2"
     })
     .then(function (response) {
      $('#editclose').click();
      if(response){
        Swal.fire({
          position: 'top',
          type: 'success',
          title: 'Route is Edited',
          showConfirmButton: false,
          timer: 1500
        })
      }
      self.getallvans();
      $('#addclose').click();
      self.selectvan = '';
      self.selectRoutes = '';
})
     .catch(function (error) {
       console.log(error);
     });
 
    
  }
}


deletevan(vansID){
  var self = this;
  console.log(vansID);
  if(self.confirmClicked == true){
  axios.put(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/vans/profiles/${vansID}`,{
    "status" : "0"
  })
      .then(function (response) {
        console.log(response);

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
        
        self.getallvans();
      })
      .catch(function (error) {
        console.log(error);
      });
    }
}



addVanRoute(){
  var self = this;
 
  if(this.selectvan == undefined ||  this.selectvan == ''){
    $("#select_van_error").html("Please select van").show().fadeOut(2000);
   }else if(this.selectRoutes == undefined ||  this.selectRoutes == ''){
    $("#select_route_error").html("Please select route").show().fadeOut(2000);
   }else{
       //  console.log(hub_info);
    axios.put(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/vans/profiles/${self.selectvan}`,{
      "routesid": this.selectRoutes,
      "status" : "2"
     })
     .then(function (response) {
      $('#addclose').click();
      if(response){
        Swal.fire({
          position: 'top',
          type: 'success',
          title: 'Route is Added',
          showConfirmButton: false,
          timer: 1500
        })
      }
      self.getallvans();
      $('#addclose').click();
      self.selectvan = '';
      self.selectRoutes = '';
})
     .catch(function (error) {
       console.log(error);
     });
 
    
  }
}



}