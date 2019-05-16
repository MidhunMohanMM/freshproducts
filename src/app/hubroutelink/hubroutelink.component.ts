import { Component, OnInit } from '@angular/core';
import axios from "axios";
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { AppGlobals } from '../app.global';
import {ActivatedRoute} from '@angular/router';
import { NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { CollectionComponent } from '../collection/collection.component';

@Component({
  selector: 'app-hubroutelink',
  templateUrl: './hubroutelink.component.html',
  styleUrls: ['./hubroutelink.component.css'],
  providers: [AppGlobals]
})
export class HubroutelinkComponent implements OnInit {

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
  key: any = "hubname";
  reverse: boolean;
  search1: any = "";
  public p: any;
  vansid: any;
  hubs: any;
  selectedhub = "";
  selecthub: any = "";
  selecteditRoutes:any = "";
  selectedithub: any = "";
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
    this.gethubuser();
    this.getallhubs();
    this.getallroutes();
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

  getallhubs(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/profiles?hubs[status]=1`)
        .then(function (res) {
          console.log(res);
          self.hubs = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getallroutes(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/routes/profiles?routes[status]=1&hubs[status]=1`)
        .then(function (res) {
          console.log(res);
          self.routes = res.data;
          for(let key in res.data){
            res.data[key].hubname = res.data[key].hub.name;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getroutebyhub(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/routes/profiles?routes[status]=1&hubs[hubsid]=${self.selectedhub}`)
        .then(function (res) {
          console.log(res);
          self.routes = res.data;
          for(let key in res.data){
            res.data[key].hubname = res.data[key].hub.name;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  assignroute(){

    if(this.selecthub == undefined ||  this.selecthub == ''){
      $("#select_van_error").html("Please select hub").show().fadeOut(2000);
     }else if(this.selectRoutes == undefined ||  this.selectRoutes == ''){
      $("#select_route_error").html("Please select route").show().fadeOut(2000);
     }else{


    var self = this;
    axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/routes/profiles/${self.selectRoutes}`,{
      "hubsid" : self.selecthub,
      "status" : "1"
    })
        .then(function (res) {
          console.log(res);
          if(res){
            Swal.fire({
              position: 'top',
              type: 'success',
              title: 'Route is Assigned',
              showConfirmButton: false,
              timer: 1500
            })
          }
          self.getallroutes();
          $('#addclose').click();
          self.selecthub = '';
          self.selectRoutes = '';
        })
        .catch(function (error) {
          console.log(error);
        });

      }
  }

  editroute(){
    
    if(this.selectedithub == undefined ||  this.selectedithub == ''){
      $("#select_van_error").html("Please select hub").show().fadeOut(2000);
     }else if(this.selecteditRoutes == undefined ||  this.selecteditRoutes == ''){
      $("#select_route_error").html("Please select route").show().fadeOut(2000);
     }else{


    var self = this;
    console.log(self.selecteditRoutes);
    axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/routes/profiles/${self.selecteditRoutes}`,{
      "hubsid" : self.selectedithub,
      "status" : "1"
    })
        .then(function (res) {
          console.log(res);
          if(res){
            Swal.fire({
              position: 'top',
              type: 'success',
              title: 'Route Assignation Edited',
              showConfirmButton: false,
              timer: 1500
            })
          }
          self.getallroutes();
          $('#editclose').click();
          self.selecthub = '';
          self.selectRoutes = '';
        })
        .catch(function (error) {
          console.log(error);
        });

      }
  }



  getroutebyID(hubID){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/routes/profiles/${hubID}`)
        .then(function (res) {
          console.log(res);
          self.selecteditRoutes = res.data.routesid;
          self.selectedithub = res.data.hub.hubsid;
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  deleteroute(hubID){
    var self = this;
    console.log(self.confirmClicked)
    if(self.confirmClicked == true){
    axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/routes/profiles/${hubID}`,{
      "status" : "0"
    })
        .then(function (res) {
          console.log(res);
          if(res){
            Swal.fire({
              position: 'top',
              type: 'success',
              title: 'Removed Route Assignation',
              showConfirmButton: false,
              timer: 1500
            })
          
       
          }
          self.confirmClicked = false;
          self.getallroutes();
          $('#addclose').click();
        })
        .catch(function (error) {
          console.log(error);
        });

      }
  }


}
