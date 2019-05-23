import { Component, OnInit } from '@angular/core';

import axios from "axios";
import { AppGlobals } from '../app.global';
import {ActivatedRoute} from '@angular/router';
import { NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [AppGlobals]
})
export class SettingsComponent implements OnInit {

  hubStock:any =[];
  order:any = "";
  vans: any;
  search1:any = "";
  selectedorder: any = "";
  key: string = ''; //set default
  reverse: boolean ;
  stocktypes: any;
  hubtypes: any;
  vantypes: any;
  number: any;
  public p: any;
  public p1: any;
  public p2: any;
  public p3: any;
  public p4: any;
  hubuserid: any;
  hubname: any;
  username: any;
  hubusertypeid: any;
  vanusers: any;
  hubusers: any;
  name: any;
  usernameadd: any;
  selectedvanusertype: any = "";
  selectedstaff: any = "";

  namehub: any= "";
  usernameaddhub: any = "";
  passwordhub: any = "";
  passwordconfirmhub: any = "";
  selectedhub: any = "";
  selectedhubusertype: any = "";

  settingsloading: boolean = true;
  vanusertypes: any;
  staffs: any;
  vanuserstypes: any;
  alreadyselectedstaff: boolean = false;
  passwordconfirm: any;
  password: any;
  hubusertypes: any;
  hubs: any;
  vanusersid: any;
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
    this.getallstockusertype();
    this.getallhubusertype();
    this.gethubuser();
    this.getallhubusers();
    this.getallvanusers();
    this.getallvanusertypes();
    this.getallstaffs();
    this.getallhubusertypes();
    this.getallhubs();
    // this.http.get('http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/users/profiles/1').subscribe(res){

    //     this.ngProgress.done();
    // }

  }

  getallhubs(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/profiles`)
        .then(function (response) {
          console.log(response);
          self.hubs = response.data;

        })
        .catch(function (error) {
          console.log(error);
        });
  }

  editvanuser(){
    var self = this;

    if(self.name == undefined || self.name == ''){
      $("#name_error_edit_vanuser").html("Please enter name").show().fadeOut(2000);
     }else if(self.usernameadd == undefined ||  self.usernameadd == ''){
      $("#username_error_edit_vanuser").html("Please enter Username").show().fadeOut(2000);
     }else if(self.selectedvanusertype == undefined ||  self.selectedvanusertype == ''){
      $("#vanuserstype_error_edit_vanuser").html("Please Select Van User Type").show().fadeOut(2000);
     }
     else if(self.selectedstaff == undefined ||  self.selectedstaff == ''){
      $("#staff_error_edit_vanuser").html("Please Select Staff").show().fadeOut(2000);
     }
     else if(self.password == undefined ||  self.password == ''){
      $("#staff_error_edit_vanuser").html("Please enter password").show().fadeOut(2000);
     }
     else if(self.passwordconfirm == undefined ||  self.passwordconfirm == '' || self.passwordconfirm != self.password){
      $("#staff_error_edit_vanuser").html("Please confirm your password").show().fadeOut(2000);
      self.password = "";
      self.passwordconfirm = "";
     }else{

      console.log(self.alreadyselectedstaff)
    if(self.alreadyselectedstaff == false){
console.log(self.selectedvanusertype);
console.log(self.selectedstaff);
console.log(self.name);
console.log(self.usernameadd);


    axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/vans/users/profiles/${self.vanusersid}`,{
      "vansuserstypesid": self.selectedvanusertype,
      "staffsid": self.selectedstaff,
      "name" : self.name,
      "username" : self.usernameadd,
      "password" : self.password,
      "status" : "1"
    })
        .then(function (response) {
          console.log(response);
          if(response){
            Swal.fire({
              position: 'top',
              type: 'success',
              title: 'Van User is Edited',
              showConfirmButton: false,
              timer: 1500
            })
          } 
          $("#addcloseeditvan").click();
          self.getallvanusers();

        })
        .catch(function (error) {
          console.log(error);
        });
       
      }
      else{
        $("#staff_error_edit_vanuser").html("Please Select Different Staff, this staff is already assigned").show().fadeOut(2000);
      }
    }
  }

  editvanusertype(){

  }

  edithubuser(){

  }

  edithubusertype(){

  }

  editstocktype(){

  }

  addvanuser(){
    var self = this;

    if(self.name == undefined || self.name == ''){
      $("#name_error").html("Please enter name").show().fadeOut(2000);
     }else if(self.usernameadd == undefined ||  self.usernameadd == ''){
      $("#username_error").html("Please enter Username").show().fadeOut(2000);
     }else if(self.selectedvanusertype == undefined ||  self.selectedvanusertype == ''){
      $("#vanuserstype_error").html("Please Select Van User Type").show().fadeOut(2000);
     }
     else if(self.selectedstaff == undefined ||  self.selectedstaff == ''){
      $("#staff_error").html("Please Select Staff").show().fadeOut(2000);
     }
     else if(self.password == undefined ||  self.password == ''){
      $("#staff_error").html("Please enter password").show().fadeOut(2000);
     }
     else if(self.passwordconfirm == undefined ||  self.passwordconfirm == '' || self.passwordconfirm != self.password){
      $("#staff_error").html("Please confirm your password").show().fadeOut(2000);
      self.password = "";
      self.passwordconfirm = "";
     }else{

      console.log(self.alreadyselectedstaff)
    if(self.alreadyselectedstaff == false){
console.log(self.selectedvanusertype);
console.log(self.selectedstaff);
console.log(self.name);
console.log(self.usernameadd);


    axios.post(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/vans/users/profiles`,{
      "vansuserstypesid": self.selectedvanusertype,
      "staffsid": self.selectedstaff,
      "name" : self.name,
      "username" : self.usernameadd,
      "password" : self.password,
      "status" : "1"
    })
        .then(function (response) {
          console.log(response);
          if(response){
            Swal.fire({
              position: 'top',
              type: 'success',
              title: 'Van User is Added',
              showConfirmButton: false,
              timer: 1500
            })
          } 

        })
        .catch(function (error) {
          console.log(error);
        });
        $("#addclose").click();
        self.getallvanusers();
      }
      else{
        $("#staff_error").html("Please Select Different Staff, this staff is already assigned").show().fadeOut(2000);
      }
    }

  }

  addhubuser(){
    var self = this;

    if(self.namehub == undefined || self.namehub == ''){
      $("#name_error_hub").html("Please enter name").show().fadeOut(2000);
     }else if(self.usernameaddhub == undefined ||  self.usernameaddhub == ''){
      $("#username_error_hub").html("Please enter Username").show().fadeOut(2000);
     }else if(self.selectedhub == undefined ||  self.selectedhub == ''){
      $("#hub_error_hub").html("Please Select Hub").show().fadeOut(2000);
     }
     else if(self.selectedhubusertype == undefined ||  self.selectedhubusertype == ''){
      $("#hubusertypes_error_hub").html("Please Select Hub User Type").show().fadeOut(2000);
     }
     else if(self.passwordhub == undefined ||  self.passwordhub == ''){
      $("#password_error_hub").html("Please Enter Password").show().fadeOut(2000);
     }
     else if(self.passwordconfirmhub == undefined ||  self.passwordconfirmhub == '' || self.passwordconfirmhub != self.passwordhub){
      $("#confirm_password_error_hub").html("Please confirm your password").show().fadeOut(2000);
      self.password = "";
      self.passwordconfirmhub = "";
     }else{

      console.log(self.selectedhub);
      console.log(self.selectedhubusertype);
      console.log(self.namehub);
      console.log(self.usernameaddhub);
      console.log(self.passwordhub);
    axios.post(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/users/profiles`,{
        "hubsid" : self.selectedhub,
        "hubsuserstypesid": self.selectedhubusertype,
        "name" : self.namehub,
        "username" : self.usernameaddhub,
        "password": self.passwordhub,
        "status" : "1"

    })
        .then(function (response) {
          console.log(response);
          if(response){
            Swal.fire({
              position: 'top',
              type: 'success',
              title: 'Hub User is Added',
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
        self.getallhubusers();

     }
  }

  getallstaffs(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/staffs/profiles`)
        .then(function (response) {
          console.log(response);
          self.staffs = response.data;

        })
        .catch(function (error) {
          console.log(error);
        });
  }
  
  checkstaff(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/vans/users/profiles`)
        .then(function (response) {
          console.log(response);
          console.log(self.selectedstaff);
          // self.vanuserstypes = response.data;
          for(let key in response.data){
            if(response.data[key].staffsid == self.selectedstaff)
            {
              self.alreadyselectedstaff = true;
              break;
            }

          }
          self.addvanuser();
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getvanuserbyid(vanusersid){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/vans/users/profiles/${vanusersid}` )
        .then(function (response) {
          console.log(response);
          self.vanusersid = response.data.vansusersid;
          self.name = response.data.name;
          self.usernameadd = response.data.username;
          // self.password = response.data.password;


        })
        .catch(function (error) {
          console.log(error);
        });
  }

  deletevanuserbyid(vanusersid){
    var self = this;
    axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/vans/users/profiles/${vanusersid}`,{
      "status" : "0"
    } )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  checkstaffedit(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/vans/users/profiles`)
        .then(function (response) {
          console.log(response);
          console.log(self.selectedstaff);
          // self.vanuserstypes = response.data;
          for(let key in response.data){
            if(response.data[key].staffsid == self.selectedstaff)
            {
              self.alreadyselectedstaff = true;
              break;
            }

          }
          self.editvanuser();
        })
        .catch(function (error) {
          console.log(error);
        });
  }


  getallvanusertypes(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/vans/users/types`)
        .then(function (response) {
          console.log(response);
          self.vanuserstypes = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getallhubusertypes(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/users/types`)
        .then(function (response) {
          console.log(response);
          self.hubusertypes = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
  }


  gethubuser(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/users/profiles/${this.hubuserid}`)
        .then(function (res) {
          console.log(res);
          self.hubname = res.data.hub.name;
          self.username = res.data.name;
          self.hubusertypeid = res.data.hubsuserstypesid;
          // if(self.hubusertypeid != '1'){
          //   self.router.navigate(['']);
          // }
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getallstockusertype(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/stocks/types`)
        .then(function (response) {
          console.log(response);
          self.stocktypes = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getallhubusers(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/users/profiles` )
        .then(function (response) {
          console.log(response);
          self.hubusers = response.data;
          for(let key in response.data){
            response.data[key].hubname = response.data[key].hub.name;
            response.data[key].hubs_userstypename = response.data[key].hubs_userstype.name;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getallhubusertype(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/users/types` )
        .then(function (response) {
          console.log(response);
          self.hubtypes = response.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getallvanusers(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/vans/users/profiles?vansusers[status]=1` )
        .then(function (response) {
          console.log(response);
          self.vanusers = response.data;
          self.getallvanusertype();
          for(let key in response.data){
            response.data[key].vans_userstypename = response.data[key].vans_userstype.name;
            response.data[key].staffname = response.data[key].staff.name;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getallvanusertype(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/vans/users/types` )
        .then(function (response) {
          self.settingsloading = false;
          console.log(response);
          self.vantypes = response.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

}
