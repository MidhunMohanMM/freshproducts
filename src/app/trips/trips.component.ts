import { Component, OnInit } from '@angular/core';
import axios from "axios";
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import {IMyDpOptions} from 'mydatepicker';

import {ActivatedRoute} from '@angular/router';
import { NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { CollectionComponent } from '../collection/collection.component';
import { AppGlobals } from '../app.global';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
  providers: [AppGlobals]
})
export class TripsComponent implements OnInit {
  number: any;
  hubuserid: any;
  hubname: any;
  loading: boolean = true;
  hubList:any;
  search1: any = "";
  selectRoutes: any = "";
  selectedhub: any = "";
  key: any = "";
  reverse: boolean;
  trips: any = [];
  hub: any;
  selecthub: any = "";
  routes: any;
  username: any;
  hubusertypeid: any;
  sales: any = "";
  sales_target: any = "";
  // model: any = "";
  public p: any;
  public myDatePickerOptions: IMyDpOptions = {

    dateFormat: 'dd.mm.yyyy',
};


public model: any = { date: { year: '', month: '', day: '' } };
  tripdate: any;
  tripsid: any;
  selectedstatus: string;


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
    this.getAllHubs();
    this.gettripprofile();
    this.getallroutes();
    var today = new Date();
    console.log(today);
    this.model.date.day = today.getDate();
    this.model.date.month = today.getMonth() + 1;
    this.model.date.year = today.getFullYear() ;
  }

  gethubuser(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/users/profiles/${this.hubuserid}`)
        .then(function (res) {
          // console.log(res);
          if(res.data.hub)
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


  getAllHubs(){
    var self = this;
    
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/profiles`)
        .then(function (response) {
          console.log(response);
          self.hubList = response.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getallroutes(){
    var self = this;
    
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/routes/profiles`)
        .then(function (response) {
          console.log(response);
          self.routes = response.data;   
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getroutebyhub(){
    var self = this;
    
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/routes/profiles?hubs[hubsid]=${self.selecthub}`)
        .then(function (response) {
          console.log(response);
          self.routes = response.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  
  gettripbyID(tripID){
    var self = this;
    
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/trips/profiles/${tripID}`)
        .then(function (response) {
          console.log(response);
          self.tripsid = response.data.tripsid;
          self.selecthub = response.data.route.hub.hubsid;
          self.selectRoutes = response.data.routesid;
          self.sales = response.data.sales;
          self.sales_target = response.data.sales_target;
          var d = new Date(response.data.tripdate); 
          var date = d.getUTCDate();
          var month = d.getUTCMonth();
          var year = d.getUTCFullYear();

          self.model.date.year = d.getFullYear();
          self.model.date.month = d.getMonth() + 1;
          self.model.date.day =d.getDate();
console.log(self.model);
          if(response.data.status == 0 || response.data.status == null ){
            self.selectedstatus = "Trip Disabled"
          }
          else if(response.data.status == 1){
            self.selectedstatus = "Trip Enabled"
          }
          else if(response.data.status == 2){
            self.selectedstatus = "Trip Started"
          }
          else if(response.data.status == 3){
            self.selectedstatus = "Trip Ended"
          }
          else if(response.data.status == 4){
            self.selectedstatus = "Trip Approved"
          }
          else if(response.data.status == 4){
            self.selectedstatus = "Trip Disapproved"
          }

        })
        .catch(function (error) {
          console.log(error);
        });
  }

  edittrip (){
    var self = this;
    console.log(self.model);
    self.tripdate = self.model.date.year+"-"+self.model.date.month+"-"+self.model.date.day+"T00:00:00.000Z";
    console.log(self.tripdate);
    axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/trips/profiles/${self.tripsid}`,{
        "routesid": self.selectRoutes,
        "crmid": "1",
        "daysid": null,
        "sales": self.sales,
        "sales_target": self.sales_target,
        "status" : "1",
        "tripdate": self.tripdate
    })
        .then(function (response) {
          console.log(response);
          $('#editclose').click();
          if(response){
            Swal.fire({
              position: 'top',
              type: 'success',
              title: 'Trip Edited',
              showConfirmButton: false,
              timer: 1500
            })
          } 
          
      })
        .catch(function (error) {
          console.log(error);
        });
  }

  addtrip (){
    var self = this;
    console.log(self.model);
    self.tripdate = self.model.date.year+"-"+self.model.date.month+"-"+self.model.date.day+"T00:00:00.000Z";
    console.log(self.tripdate);
    axios.post(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/trips/profiles`,{
        "routesid": self.selectRoutes,
        "crmid": "1",
        "daysid": null,
        "sales": self.sales,
        "sales_target": self.sales_target,
        "status" : "1",
        "tripdate": self.tripdate
    })
        .then(function (response) {
          console.log(response);
          if(response){
            Swal.fire({
              position: 'top',
              type: 'success',
              title: 'Trip is Added',
              showConfirmButton: false,
              timer: 1500
            })
          } 
      })
        .catch(function (error) {
          console.log(error);
        });
  }


  gettripprofile(){
    var self = this;
    
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/trips/profiles`)
        .then(function (response) {
          self.loading = false;
          console.log(response);
          self.trips = response.data;
          for(let key in response.data){
            var d = new Date(response.data[key].tripdate); 
            var date = d.getUTCDate();
            var month = d.getUTCMonth() + 1;
            var year = d.getUTCFullYear();
            if(response.data[key].route.hub){
              response.data[key].routehubname = response.data[key].route.hub.name;
            }
            else{
              response.data[key].routehubname = "NULL"
            }
           
            response.data[key].routename = response.data[key].route.name;
            response.data[key].date = date + ' -' + month+ ' -' +year;
            if(response.data[key].status == 0 || response.data[key].status == null ){
              response.data[key].statuswords = "Trip Disabled"
            }
            else if(response.data[key].status == 1){
              response.data[key].statuswords = "Trip Enabled"
            }
            else if(response.data[key].status == 2){
              response.data[key].statuswords = "Trip Started"
            }
            else if(response.data[key].status == 3){
              response.data[key].statuswords = "Trip Ended"
            }
            else if(response.data[key].status == 4){
              response.data[key].statuswords = "Trip Approved"
            }
            else if(response.data[key].status == 4){
              response.data[key].statuswords = "Trip Disapproved"
            }
          }
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }


gettripbyhub(){
  var self = this;
    
  axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/trips/profiles`)
      .then(function (response) {
        console.log(response);
        self.trips = response.data;
        // self.hub = response.data.route.hub.name;
        self.trips = [];

        for(let key in response.data){
          var d = new Date(response.data[key].tripdate); 
          var date = d.getUTCDate();
          var month = d.getUTCMonth();
          var year = d.getUTCFullYear();
          response.data[key].routehubname = response.data[key].route.hub.name;
          response.data[key].routename = response.data[key].route.name;
          response.data[key].date = date + ' -' + month+ ' -' +year;
          if(response.data[key].status == 0 || response.data[key].status == null){
            response.data[key].statuswords = "Trip Disabled"
          }
          else if(response.data[key].status == 1){
            response.data[key].statuswords = "Trip Enabled"
          }
          else if(response.data[key].status == 2){
            response.data[key].statuswords = "Trip Started"
          }
          else if(response.data[key].status == 3){
            response.data[key].statuswords = "Trip Ended"
          }
          else if(response.data[key].status == 4){
            response.data[key].statuswords = "Trip Approved"
          }
          else if(response.data[key].status == 4){
            response.data[key].statuswords = "Trip Disapproved"
          }

          response.data[key].hub =  response.data[key].route.hub.hubsid;
          if(response.data[key].hub == self.selectedhub){
            self.trips.push(response.data[key]);
          }
        }

        console.log(self.trips);
        
      })
      .catch(function (error) {
        console.log(error);
      });
}

}