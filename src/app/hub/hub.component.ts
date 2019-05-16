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
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css'],
  providers: [AppGlobals]
})
export class HubComponent implements OnInit {
  hubList:any;hubId:any;
  hubLocation:any;hubName:any;hubAdd:any;
  hubname: any;
  address1: any;
  loading: boolean = true;
  address2: any;
  
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

    this.getallhubs();
    this.gethubuser();
  }

  getallhubs(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/profiles?hubs[status]=1`)
        .then(function (res) {
          self.loading = false;
          console.log(res);
          self.hubList = res.data;
          
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
          // self.hubname = res.data.hub.name;
          self.username = res.data.name;
          self.hubusertypeid = res.data.hubsuserstypesid;
          if(self.hubusertypeid != '1'){
            self.router.navigate(['' ]);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  addNewHub(){
    console.log(this.hubName);
    if(this.hubname== undefined || this.hubname == ''){
     $("#hub_name_error").html("Please enter name").show().fadeOut(2000);
    }else if(this.address1 == undefined ||  this.address1 == ''){
     $("#hub_location_error").html("Please enter location").show().fadeOut(2000);
    }else if(this.address2 == undefined ||  this.address2 == ''){
     $("#hub_add_error").html("Please enter City/District/Pin").show().fadeOut(2000);
    }else{
      var self = this;
    
     var hub_info ={
      "name": this.hubname,
      "address1": this.address1,
      "address2": this.address2,
      "status" : "1"
     }
     console.log(hub_info);
     axios.post(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/profiles`,hub_info
     ).then(function (res) {
 
       console.log(res);
      //  localStorage.setItem('contact_info', JSON.stringify(res.data));
       
       if(res){
        Swal.fire({
          position: 'top',
          type: 'success',
          title: 'Hub is Added',
          showConfirmButton: false,
          timer: 1500
        })
      }
      self.hubName = '';
       self.hubLocation = '';
       self.hubAdd = '';
       self.getallhubs();
     })
     .catch(function (error) {
       console.log(error);
     });
 
    }
}

gethubbyID(hubId){
  var self = this;
  console.log(hubId);
  axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/profiles/` +hubId)
      .then(function (response) {
        console.log(response);
       self.hubname = response.data.name;
       self.address1 = response.data.address1;
       self.address2 = response.data.address2;
      self.hubsid = response.data.hubsid;
      })
      .catch(function (error) {
        console.log(error);
      });
      
}

deletehub(hubId){
  var self = this;
  console.log(hubId);
  if(self.confirmClicked == true){
  axios.put(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/profiles/${hubId}`,{
    "status" : "0"
  })
      .then(function (response) {
        console.log(response);
        self.getallhubs();
        self.confirmClicked = false;
      })
      .catch(function (error) {
        console.log(error);
      });
    }
}

edithub(){
  if(this.hubname== undefined || this.hubname == ''){
    $("#edit_hub_name_error").html("Please enter name").show().fadeOut(2000);
   }else if(this.address1 == undefined ||  this.address1 == ''){
    $("#edit_hub_location_error").html("Please enter location").show().fadeOut(2000);
   }else if(this.address2 == undefined ||  this.address2 == ''){
    $("#edit_hub_add_error").html("Please enter City/District/Pin").show().fadeOut(2000);
   }else{
  var self = this;
  axios.put(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/profiles/${self.hubsid}`,{
    "name": self.hubname,
    "address1": self.address1,
    "address2": self.address2,
    "status": "1"
  })
      .then(function (response) {
        console.log(response);
        if(response){
          Swal.fire({
            position: 'top',
            type: 'success',
            title: 'Hub is Edited',
            showConfirmButton: false,
            timer: 1500
          })
        }
        $('#editclose').click();
        self.getallhubs();
  })
      .catch(function (error) {
        console.log(error);
      });
      
}
}

}
