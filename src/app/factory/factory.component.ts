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
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.css'],
  providers: [AppGlobals]
})
export class FactoryComponent implements OnInit {
listFactory:any
number: any
hubuserid: any
name:any
address1:any
address2:any
fid:any
factorydetails:any
factorytransfers: any;
factoryid:any;
search1: any = "";
  key: string = "productname";
  reverse: boolean;
  hubname: any;
  public p: any;
  public pq: any;
  username: any;
  factorystockloading: boolean = true;
  hubusertypeid: any;
  factorystocks: any;
sort(key){
  this.key = key;
  this.reverse = !this.reverse;
}

public popoverTitle: string = 'Delete Factory';
  public popoverMessage: string = 'Are you really <b>sure</b> you want to do this?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
constructor(private excelService:ExcelService,private route : ActivatedRoute ,  private router: Router, private _location: Location, private _global: AppGlobals) {
  this.route.params.subscribe(params => {
    // console.log(params);
    this.number = params;
    this.hubuserid = this.number.id;
    // console.log(this.hubuserid);
    });
 }

  ngOnInit() {
    this.getFactoryTable();
    this.gethubuser();
    this.getfactorytransfers();
    this.getfactorystock();
  }

  getfactorystockbysearch(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/stocks?search=${self.search1}`)
        .then(function (response) {
          console.log(response);
        
          for(let key in response.data){
            response.data[key].productname = response.data[key].product.name;
          }
          self.factorystocks = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
  }
    

  getfactorytransfers(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/transfers`)
        .then(function (response) {
          console.log(response);
              
        for(let key in response.data){
          response.data[key].hubname = response.data[key].hub.name;
          response.data[key].productname = response.data[key].product.name;
        }
          self.factorytransfers = response.data;
          
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
          if(self.hubusertypeid != '1'){
            self.router.navigate(['']);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  
getFactoryTable(){
  var self = this;
  axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/profiles?factories[status]=1`)
      .then(function (response) {
        console.log(response);
        self.listFactory = response.data;
        
      })
      .catch(function (error) {
        console.log(error);
      });
}

getfactorystock(){
  var self = this;
  axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/stocks`)
      .then(function (response) {
        self.factorystockloading = false;
        console.log(response);
      
        for(let key in response.data){
          response.data[key].productname = response.data[key].product.name;
        }
        self.factorystocks = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
}


addNewFactory(){
  if(this.name == undefined ||  this.name == ''){
    $("#factory_name_error").html("Please enter name").show().fadeOut(2000);
   }else if(this.address1 == undefined ||  this.address1 == ''){
    $("#factory_address1_error").html("Please enter address1").show().fadeOut(2000);
   }else if(this.address2 == undefined ||  this.address2 == ''){
    $("#factory_address2_error").html("Please enter address2").show().fadeOut(2000);
   }else{
    {
      var self = this;
      
     var hub_info ={
      "name": this.name,
      "address1": this.address1,
      "address2": this.address2,
      "status" : "1"
     }
      console.log(hub_info);
     axios.post(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/profiles`,hub_info
     ).then(function (res) {
 
        console.log(res);
      //  localStorage.setItem('contact_info', JSON.stringify(res.data));
       
       if(res){
        Swal.fire({
          position: 'top',
          type: 'success',
          title: 'Factory is Added',
          showConfirmButton: false,
          timer: 1500
        })
      }
      self.name = '';
       self.address1 = '';
       self.address2 = '';
       
       self.getFactoryTable();
     })
     .catch(function (error) {
       console.log(error);
     });
 
    }
  }
}
getFactoryByid(fid){
  var self = this;
  axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/profiles/${fid}`)
  .then(function (response) {
    // console.log(response);
    self.factorydetails = response.data;
    self.name = response.data.name;
    self.address1 = response.data.address1;
    self.address2 = response.data.address2;
    self.factoryid=response.data.factoriesid;
  })
  .catch(function (error) {
    console.log(error);
  });
}
editFactory(){
  if(this.name == undefined ||  this.name == ''){
    $("#factory_name_error").html("Please enter name").show().fadeOut(2000);
   }else if(this.address1 == undefined ||  this.address1 == ''){
    $("#factory_address1_error").html("Please enter address1").show().fadeOut(2000);
   }else if(this.address2 == undefined ||  this.address2 == ''){
    $("#factory_address2_error").html("Please enter address2").show().fadeOut(2000);
   }else{
    
      var self = this;
      
 
     axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/profiles/${self.factoryid}`,{
      "name": this.name,
      "address1": this.address1,
      "address2": this.address2,
      "status" : "1"
     })
 
     .then(function (response) {
      $('#editclose').click();
      if(response){
        Swal.fire({
          position: 'top',
          type: 'success',
          title: 'Factory is Edited',
          showConfirmButton: false,
          timer: 1500
        })
      }
    
      self.getFactoryTable();
})
    .catch(function (error) {
      console.log(error);
    });
 
    
  }
}
deleteFactory(fid){
  var self = this;
  if(self.confirmClicked == true){
    axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/profiles/${fid}`,{
      "status" : "0"
    })
        .then(function (response) {
         
          if(response){
            Swal.fire({
              position: 'top',
              type: 'success',
              title: 'Factory is Deleted',
              showConfirmButton: false,
              timer: 1500
            })
          }
          self.getFactoryTable();
          self.confirmClicked = false;
        })
        .catch(function (error) {
          console.log(error);
        });
      }
}
}
