import { Component, OnInit } from '@angular/core';
import {ExcelService} from '../services/excel.service';
import axios from "axios";
import * as $ from 'jquery';
import {ActivatedRoute} from '@angular/router';
import { NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { columnsTotalWidth } from '@swimlane/ngx-datatable/release/utils';
import { AppGlobals } from '../app.global';

@Component({
  selector: 'app-adminnewshops',
  templateUrl: './adminnewshops.component.html',
  styleUrls: ['./adminnewshops.component.css'],
  providers: [AppGlobals]
})
export class AdminnewshopsComponent implements OnInit {

  number: any;
  hubuserid: any;
  get: any;
  hubname: any;
  username: any;
  hubusertypeid: any;
  newshops: any;
  key: string = 'name'; //set default
  reverse: boolean;
  search1: any = "";
  public p: any;
  newshopflag: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }


  constructor(private excelService:ExcelService,private route : ActivatedRoute ,  private router: Router, private _location: Location, private _global: AppGlobals) {
    this.route.params.subscribe(params => {
      // console.log(params);
      this.number = params;
      this.hubuserid = this.number.id;
      // console.log(this.hubuserid);
      });
   }

   ngOnInit() {

    this.gethubuser();
    this.getnewshops();
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

  getnewshops(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/newshops/profiles`)
        .then(function (res) {
          if(res.data.length != 0){
            self.newshopflag = true;
          }
          console.log(res);
          self.newshops = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
  }


}
