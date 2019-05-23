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
  key: string = 'name'; //set default
  reverse: boolean ;
  stocktypes: any;
  hubtypes: any;
  vantypes: any;
  vanusertypename: any = "";
  hubusertypename: any = "";
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
  public popoverTitle: string = 'Delete Van User';
  public popoverMessage: string = 'Are you really <b>sure</b> you want to do this?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  public popoverTitlehubuser: string = 'Delete Hub User';
  public popoverMessagehubuser: string = 'Are you really <b>sure</b> you want to do this?';
  public confirmClickedhubuser: boolean = false;
  public cancelClickedhubuser: boolean = false;

  public popoverTitlestocktype: string = 'Delete Stock Type';
  public popoverMessagestocktype: string = 'Are you really <b>sure</b> you want to do this?';
  public confirmClickedstocktype: boolean = false;
  public cancelClickedstocktype: boolean = false;

  
  public popoverTitlevanusertype: string = 'Delete Van User Type';
  public popoverMessagevanusertype: string = 'Are you really <b>sure</b> you want to do this?';
  public confirmClickedvanusertype: boolean = false;
  public cancelClickedvanusertype: boolean = false;

  public popoverTitlehubusertype: string = 'Delete Hub User Type';
  public popoverMessagehubusertype: string = 'Are you really <b>sure</b> you want to do this?';
  public confirmClickedhubusertype: boolean = false;
  public cancelClickedhubusertype: boolean = false;



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
  stocktypename: any = "";
  password: any;
  hubusertypes: any;
  hubs: any;
  vanusersid: any;
  hubsusersid: any;
  stockstypesid: any;
  vansuserstypesid: any;
  hubsuserstypesid: any;
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
    this.getallhubusertype();
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
    var self = this;

    if(self.vanusertypename == undefined || self.vanusertypename == ''){
      $("#vanuser_type_name_edit").html("Please enter name").show().fadeOut(2000);
     }else{
       console.log(self.vansuserstypesid);
      axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/vans/users/types/${self.vansuserstypesid}`,{
        "name" : self.vanusertypename,
        "status" : "1"
      })
          .then(function (response) {
            console.log(response);
            if(response){
              Swal.fire({
                position: 'top',
                type: 'success',
                title: 'Van User Type is Edited',
                showConfirmButton: false,
                timer: 1500
              })
            } 
  
            $("#editvanusertype").click();
            self.getallvanusertype();
          })
          .catch(function (error) {
            console.log(error);
          });
     }

  }

  edithubuser(){
    var self = this;

    if(self.namehub == undefined || self.namehub == ''){
      $("#name_error_hub_edit").html("Please enter name").show().fadeOut(2000);
     }else if(self.usernameaddhub == undefined ||  self.usernameaddhub == ''){
      $("#username_error_hub_edit").html("Please enter Username").show().fadeOut(2000);
     }else if(self.selectedhub == undefined ||  self.selectedhub == ''){
      $("#hub_error_hub_edit").html("Please Select Hub").show().fadeOut(2000);
     }
     else if(self.selectedhubusertype == undefined ||  self.selectedhubusertype == ''){
      $("#hubusertypes_error_hub_edit").html("Please Select Hub User Type").show().fadeOut(2000);
     }
     else if(self.passwordhub == undefined ||  self.passwordhub == ''){
      $("#password_error_hub_edit").html("Please Enter Password").show().fadeOut(2000);
     }
     else if(self.passwordconfirmhub == undefined ||  self.passwordconfirmhub == '' || self.passwordconfirmhub != self.passwordhub){
      $("#confirm_password_error_hub_edit").html("Please confirm your password").show().fadeOut(2000);
      self.password = "";
      self.passwordconfirmhub = "";
     }else{

      console.log(self.selectedhub);
      console.log(self.selectedhubusertype);
      console.log(self.namehub);
      console.log(self.usernameaddhub);
      console.log(self.passwordhub);
    axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/users/profiles/${self.hubsusersid}`,{
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
              title: 'Hub User is Edited',
              showConfirmButton: false,
              timer: 1500
            })
          } 

          $("#addclosehubedit").click();
          self.getallhubusers();
          // self.staffs = response.data;

        })
        .catch(function (error) {
          console.log(error);
        });

  

     }
  }

  edithubusertype(){
    var self = this;

    if(self.hubusertypename == undefined || self.hubusertypename == ''){
      $("#hubuser_type_name_edit").html("Please enter name").show().fadeOut(2000);
     }else{
       console.log(self.vansuserstypesid);
      axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/users/types/${self.hubsuserstypesid}`,{
        "name" : self.hubusertypename,
        "status" : "1"
      })
          .then(function (response) {
            console.log(response);
            if(response){
              Swal.fire({
                position: 'top',
                type: 'success',
                title: 'Hub User Type is Edited',
                showConfirmButton: false,
                timer: 1500
              })
            } 
  
            $("#edithubusertype").click();
            self.getallhubusertype();
          })
          .catch(function (error) {
            console.log(error);
          });
     }
  }

  editstocktype(){

    var self = this;

    if(self.stocktypename == undefined || self.stocktypename == ''){
      $("#stock_type_name_edit").html("Please enter name").show().fadeOut(2000);
     }else{
      axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/stocks/types/${self.stockstypesid}`,{
        "name" : self.stocktypename,
        "status" : "1"
      })
          .then(function (response) {
            console.log(response);
            if(response){
              Swal.fire({
                position: 'top',
                type: 'success',
                title: 'Stock Type is Edited',
                showConfirmButton: false,
                timer: 1500
              })
            } 
  
            $("#editstocktype").click();
            self.getallstockusertype();
          })
          .catch(function (error) {
            console.log(error);
          });
     }


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
          $("#addclose").click();
          self.getallvanusers();

        })
        .catch(function (error) {
          console.log(error);
        });
      
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
            $("#addclosehub").click();
            self.getallhubusers();
          } 
          // self.staffs = response.data;

        })
        .catch(function (error) {
          console.log(error);
        });

       

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
          self.selectedvanusertype = response.data.vans_userstype.vansuserstypesid;
          self.selectedstaff = response.data.staff.staffsid;
          // self.password = response.data.password;


        })
        .catch(function (error) {
          console.log(error);
        });
  }

  gethubuserbyid(hubuserid){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/users/profiles/${hubuserid}`)
        .then(function (res) {
          console.log(res);
          self.hubsusersid = res.data.hubsusersid;
          self.usernameaddhub = res.data.username;
          self.namehub = res.data.name;
          self.selectedhub = res.data.hub.hubsid;
          self.selectedhubusertype = res.data.hubs_userstype.hubsuserstypesid;
        })
        .catch(function (error) {
          console.log(error);
        });

  }

  getstocktypebyid(stocktypeid){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/stocks/types/${stocktypeid}`)
        .then(function (response) {
          console.log(response);
          self.stockstypesid = response.data.stockstypesid;
          self.stocktypename = response.data.name;
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getvanusertypebyid(vanusertypeid){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/vans/users/types/${vanusertypeid}` )
        .then(function (response) {
          self.vanusertypename = response.data.name;
          self.vansuserstypesid = response.data.vansuserstypesid;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  gethubusertypebyid(hubusertypeid){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/users/types/${hubusertypeid}` )
        .then(function (response) {
          self.hubusertypename = response.data.name;
          self.hubsuserstypesid = response.data.hubsuserstypesid;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  deletehubuserbyid(hubuserid){
    var self = this;
    if(self.confirmClickedhubuser == true){
      axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/users/profiles/${hubuserid}`,{
        "status" : "0"
      } )
          .then(function (response) {
            console.log(response);
            self.getallhubusers();
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  }

  deletevanuserbyid(vanusersid){
    var self = this;
    if(self.confirmClicked == true){
      axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/vans/users/profiles/${vanusersid}`,{
        "status" : "0"
      } )
          .then(function (response) {
            console.log(response);
            self.getallvanusers();
          })
          .catch(function (error) {
            console.log(error);
          });
    }
 
  }

  deletestocktypebyid(stocktypeid){
    var self = this;
    if(self.confirmClickedstocktype == true){
      axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/stocks/types/${stocktypeid}`,{
        "status" : "0"
      } )
          .then(function (response) {
            console.log(response);
            self.getallstockusertype();
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  }

  deletevanusertypebyid(vanusertypeid){
    var self = this;
    if(self.confirmClickedvanusertype == true){
      axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/vans/users/types/${vanusertypeid}`,{
        "status" : "0"
      } )
          .then(function (response) {
            console.log(response);
            self.getallvanusertype();
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  }

  deletehubusertypebyid(hubusertypeid){
    var self = this;
    if(self.confirmClickedhubusertype == true){
      axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/users/types/${hubusertypeid}`,{
        "status" : "0"
      } )
          .then(function (response) {
            console.log(response);
            self.getallhubusertype();
          })
          .catch(function (error) {
            console.log(error);
          });
    }
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
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/stocks/types?stockstypes[status]=1`)
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
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/users/profiles?hubsusers[status]=1` )
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
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/users/types?hubsuserstypes[status]=1` )
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
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/vans/users/types?vansuserstypes[status]=1` )
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
