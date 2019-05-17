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
  selector: 'app-adminroutes',
  templateUrl: './adminroutes.component.html',
  styleUrls: ['./adminroutes.component.css'],
  providers: [AppGlobals]
})
export class AdminroutesComponent implements OnInit {
  routeList:any;hubId:any;
  hubLocation:any;hubName:any;hubAdd:any;
  hubname: any;
  address1: any;
  selectedhub: any = "";
  address2: any;
  routeloading: boolean = true
  search1:any = "";

  key: string = 'name'; //set default
  reverse: boolean ;
  number: any;
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
  hubs: any;
  newrouteList: any;
  deleterouteList: any;
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
    this.getallhubs();
    this.getallapprovalroutes();
    this.getalldeleteroutes();
  }

  getallroutes(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/routes/profiles?routes[status]=1`)
        .then(function (res) {
          self.routeloading = false;
          console.log(res);
          for(let key in res.data){
              res.data[key].hubname = res.data[key].hub.name;
          }
          self.routeList = res.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }


  
  getallapprovalroutes(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/routes/profiles?routes[status]=2`)
        .then(function (res) {
          console.log(res);
          for(let key in res.data){
              res.data[key].hubname = res.data[key].hub.name;
          }
          self.newrouteList = res.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getalldeleteroutes(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/routes/profiles?routes[status]=3`)
        .then(function (res) {
          console.log(res);
          for(let key in res.data){
              res.data[key].hubname = res.data[key].hub.name;
          }
          self.deleterouteList = res.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  approveroute(routeID){
    var self = this;
    axios.put(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/routes/profiles/${routeID}`,{
      "status" : "1"
    })
        .then(function (res) {
          console.log(res);

          self.getallapprovalroutes();
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  rejectroute(routeID){
    var self = this;
    axios.put(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/routes/profiles/${routeID}`,{
      "status" : "0"
    })
        .then(function (res) {
          console.log(res);

          self.getallapprovalroutes();
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }


  getallhubs(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/profiles?hubs[status]=1`)
        .then(function (res) {
          console.log(res);
          self.hubs = res.data;
          
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
          if(self.hubusertypeid != '1'){
            self.router.navigate(['' ]);
          }
          self.getallroutes();
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
          self.routeList = res.data;
          for(let key in res.data){
            res.data[key].hubname = res.data[key].hub.name;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  addNewRoute(){
    console.log(this.routename);
    if(this.routename== undefined || this.routename == ''){
     $("#hub_name_error").html("Please enter route name").show().fadeOut(2000);
    }
    else if(this.selectedhub == undefined || this.selectedhub == ''){
     $("#hub_location_error").html("Please select hub").show().fadeOut(2000);
    }else{
      var self = this;
    
     var hub_info ={
      "name": this.routename,
      "crmid_routes" : "1",
      "hubsid" : this.selectedhub,
      "status" : "1"
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
  // if(self.confirmClicked == true){
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
        self.getalldeleteroutes();
        self.confirmClicked = false;
      })
      .catch(function (error) {
        console.log(error);
      });
  //  }
}



rejectdeleteroute(routeID){
  var self = this;
  console.log(routeID);
  // if(self.confirmClicked == true){
  axios.put(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/routes/profiles/${routeID}`,{
    "status" : "1"
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
        self.getalldeleteroutes();
        self.confirmClicked = false;
      })
      .catch(function (error) {
        console.log(error);
      });
    //}
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
