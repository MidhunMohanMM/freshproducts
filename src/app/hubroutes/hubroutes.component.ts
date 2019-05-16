import { Component, OnInit } from '@angular/core';
// import { DataService } from '../data.service';
import {ActivatedRoute} from '@angular/router';
import { Router, NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
import axios from "axios";
import { AppGlobals } from '../app.global';

import * as $ from 'jquery';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-hubroutes',
  templateUrl: './hubroutes.component.html',
  styleUrls: ['./hubroutes.component.css'],
  providers: [AppGlobals]
})
export class HubroutesComponent implements OnInit {
  routeList:any;hubId:any;
  hubLocation:any;hubName:any;hubAdd:any;
  hubname: any;
  address1: any;
  address2: any;
  
  search1:any = "";

  key: string = 'name'; //set default
  reverse: boolean ;
  number: any;
  loading: boolean = true;
  hubuserid: any;
  username: any;
  hubusertypeid: any;
  hubsid: any;
  public popoverTitle: string = 'Delete Hub';
  public popoverMessage: string = 'Are you really <b>sure</b> you want to do this?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  routename: any;
  routesid: any;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  p: number = 1;


  constructor(  private route : ActivatedRoute ,  private router: Router, private _location: Location, private _global: AppGlobals) {
    this.route.params.subscribe(params => {
      console.log(params);
      this.number = params;
      this.hubuserid = this.number.id;
      console.log(this.hubuserid);
      });
   }

  ngOnInit() {

 
    this.gethubuser();
  }

  getallroutes(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/routes/profiles?hubs[hubsid]=${this.hubsid}&routes[status]=1`)
        .then(function (res) {
          self.loading = false;
          console.log(res);
          self.routeList = res.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  gethubuser(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/users/profiles/${ this.hubuserid}` )
        .then(function (res) {
          console.log(res);
          self.hubsid = res.data.hubsid;
          // self.hubname = res.data.hub.name;
          self.username = res.data.name;
          self.hubusertypeid = res.data.hubsuserstypesid;
          if(self.hubusertypeid == '1'){
            self.router.navigate(['' ]);
          }
          self.getallroutes();
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  addNewRoute(){
    console.log(this.routename);
    if(this.routename== undefined || this.routename == ''){
     $("#hub_name_error").html("Please enter route name").show().fadeOut(2000);
    }else{
      var self = this;
    
     var hub_info ={
      "name": this.routename,
      "crmid_routes" : "1",
      "hubsid" : this.hubsid,
      "status" : "2"
     }
     console.log(hub_info);
     axios.post(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/routes/profiles`,hub_info
     ).then(function (res) {
 
       console.log(res);
      //  localStorage.setItem('contact_info', JSON.stringify(res.data));
       
       if(res){
        Swal.fire({
          position: 'top',
          type: 'success',
          title: 'Route Submitted for verification',
          showConfirmButton: false,
          timer: 1500
        })
      }
      self.routename = '';
      $('#addclose').click();
       self.getallroutes();
     })
     .catch(function (error) {
       console.log(error);
     });
 
    }
}

getroutebyID(routeID){
  var self = this;
  console.log(routeID);
  axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/routes/profiles/` +routeID)
      .then(function (response) {
        console.log(response);
        self.routesid = response.data.routesid;
       self.routename = response.data.name;
      })
      .catch(function (error) {
        console.log(error);
      });
      
}

deleteroute(routeID){
  var self = this;
  console.log(routeID);
  if(self.confirmClicked == true){
  axios.put(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/routes/profiles/${routeID}`,{
    "status" : "0"
  })
      .then(function (response) {
        console.log(response);
        if(response){
          Swal.fire({
            position: 'top',
            type: 'success',
            title: 'Route Deleted',
            showConfirmButton: false,
            timer: 1500
          })
        }
        self.getallroutes();
        self.confirmClicked = false;
      })
      .catch(function (error) {
        console.log(error);
      });
    }
}

editroute(){
  if(this.routename== undefined || this.routename == ''){
    $("#edit_hub_name_error").html("Please enter name").show().fadeOut(2000);
  }else{
  var self = this;
  axios.put(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/routes/profiles/${self.routesid}`,{
    "name": self.routename,
  })
      .then(function (response) {
        console.log(response);
        if(response){
          Swal.fire({
            position: 'top',
            type: 'success',
            title: 'Route is Edited',
            showConfirmButton: false,
            timer: 1500
          })
        }
        $('#editclose').click();
        self.getallroutes();
  })
      .catch(function (error) {
        console.log(error);
      });
      
}
}

}
