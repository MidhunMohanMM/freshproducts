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
  selector: 'app-admininvoice',
  templateUrl: './admininvoice.component.html',
  styleUrls: ['./admininvoice.component.css'],
  providers: [AppGlobals]
})
export class AdmininvoiceComponent implements OnInit {
  hubuserid: any;
  hubname: any;
  username: any;
  hubusertypeid: any;
  number: any;
  
  newshops: any;
  key: string = 'name'; //set default
  reverse: boolean;
  search1: any = "";
  public p: any;
  newshopflag: boolean = false;
  invoices: any;
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
    this.getinvoice();
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

  getinvoice(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/invoices/profiles`)
        .then(function (res) {
          console.log(res);
          if(res.data.length != 0){
            self.newshopflag = true;
          }
          self.invoices = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
  }

}
