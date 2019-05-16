import { Component, OnInit } from '@angular/core';

import axios from "axios";
import { AppGlobals } from '../app.global';
import {ActivatedRoute} from '@angular/router';
import { NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
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
  hubuserid: any;
  hubname: any;
  username: any;
  hubusertypeid: any;
  vanusers: any;
  hubusers: any;
  settingsloading: boolean = true;
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
 
    // this.http.get('http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/users/profiles/1').subscribe(res){

    //     this.ngProgress.done();
    // }

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
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/vans/users/profiles` )
        .then(function (response) {
          console.log(response);
          self.vanusers = response.data;
          self.getallvanusertype();
          for(let key in response.data){
            response.data[key].vans_userstypename = response.data[key].vans_userstype.name;
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
