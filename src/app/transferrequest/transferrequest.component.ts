import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {ExcelService} from '../services/excel.service';
import axios from "axios";

import {ActivatedRoute, Params} from '@angular/router';
import { NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs';
import { AppGlobals } from '../app.global';

@Component({
  selector: 'app-transferrequest',
  templateUrl: './transferrequest.component.html',
  styleUrls: ['./transferrequest.component.css'],
  providers: [AppGlobals]
})
export class TransferrequestComponent implements OnInit {

  data: any = [{
    Sl_No: '1',
    Stock_Item_Name: 'Potato Chips 75g',
    Order_Quantity: '30'
    }];


  hub: any = "";
  selectedhub:any="1";
  itemname: any  = "Approve";
  i: any = "0";
  public p: any;
  public popoverTitle: string = 'Reject All';
  public popoverMessage: string = 'Are you really <b>sure</b> you want to do this?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  transferflag: boolean = false;

  key: string = 'hubname'; //set default
  reverse: boolean = false;
  hubs: any;
  stockitem: any;
  number: any;
  hubuserid: any;
  hubname: any;
  username: any;
  hubusertypeid: any;
  accept: any  = "Approve";
  reject: any = "Reject ";
  factorytransfers: any = [];
  search1: any = "";
  factorytransferid: any;
  hubselected: any = "";
  editquantity: any;
  editfactorytransfersid: any;
  invoices: any = [];
  invhubname: any;
  public model: any = { date: { year: 2019, month: 10, day: 9 } };
  hubaddress1: any;
  hubaddress2: any;
  expanded: boolean = false;
  changedtransfer: any;
  previouseditquantity: any;
  sub: any;
  factorytransfersbyhub: any;
  flag: boolean = false;
  oddvalue: any;
  // userSubscription: Subscription;
  hublength: any;
  transferlength: any;
  factorytransferlength: any;
  addmonth: string;
  addday: string;
  deliverydate: string;
  hubsid: any;
  
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }


  colorchange(key){
    this.key = key;
    this.reverse = !this.reverse;
   

    if(this.i %2 == 1){
      this.itemname = "Approve"
    }
    else{
      this.itemname = "Remove Item"
    }
    this.i ++;
    console.log(this.i)
  }

  acceptbtn(id){
    console.log(id);
    this.factorytransferid = id;
    this.factorytransferapproval();
    this.getinvoice(id);
    if(this.accept == 'Edit'){
      this.reject = "Reject";
      this.accept = "Approve";
    }
 else{
  this.accept = "Approved";
        this.reject = "Edit";
 }

  }

  
  rejectbtn(id){
    // this.key = key;
    this.factorytransferid = id;
    this.factorytransferreject();
    if(this.reject == 'Edit'){
      this.reject = "Reject";
      this.accept = "Approve";
    }

    else{
      this.reject = "Rejected";
      this.accept = "Edit";
    }
    

 
 
  }

  
  

  constructor(private excelService:ExcelService,private route : ActivatedRoute ,  private router: Router, private _location: Location, private _global: AppGlobals) {
    this.route.params.subscribe(params => {
      console.log(params);
      this.number = params;
      this.hubuserid = this.number.id;
      // this.selectedhub = this.number.hubsid;
      console.log(this.hubuserid);
      });

      var today = new Date();
      console.log(today);
      this.model.date.day = today.getDate();
      this.model.date.month = today.getMonth() + 1;
      this.model.date.year = today.getFullYear() ;

   }

  ngOnInit() {
    // setInterval(this.factorytransfer, 2000);
    console.log(this.hub);
   this.getallhubs();
    this.gethubuser();
    this.gettransferbyhubID();

//     this.userSubscription = this.route.params.subscribe(
//       (params: Params) => {
//            console.log("hi");
//            this.gettransferbyhubID();
// })
    
    this.sub = Observable.interval(3000)
    .subscribe((val) => { this.gettransferbyhubID() });
  }
//   ngOnDestroy(): void {
//     this.userSubscription.unsubscribe()
// }




  
  gethubuser(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/users/profiles/${this.hubuserid}`)
        .then(function (res) {
          console.log(res);
          self.hubsid = res.data.hubsid;
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
  
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.data, 'collection');
 }


async getallhubs(){
  var self = this;
  axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/profiles`)
      .then(function (res) {

        self.hubs = res.data;
        for(let key in res.data){
          res.data[key].transferreqcount = "0";
        }
        self.test();
      })
      .catch(function (error) {
        console.log(error);
      });
}

async  test(){
  await Promise.all( this.hubs.map(async (num) => {
    const result = await this.gettransferrequestcount(num);
  }));
}

gettransferrequestcount(x){
  return new Promise((resolve, reject) => {
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/transfers?factoriestransfers[status]=1&hubs[hubsid]=${x.hubsid}`)
    .then(function (response) {
      console.log(response);
      x.transferreqcount = response.data.length;
      // self.customerorders = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  });
}





factorytransfer(){
  var self = this;
  axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/transfers?factoriestransfers[status]=1`)
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

getinvoice(tranferrequestID){
  var self = this;
  self.expanded = true;


    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/transfers/${tranferrequestID}`)
      .then(function (response) {
        console.log(response);
          self.invoices.push(response.data);
          console.log(self.invoices);
          self.invhubname = response.data.hub.name;
          self.hubaddress1 = response.data.hub.address1;
          self.hubaddress2 = response.data.hub.address2;
    })
    .catch(function (error) {
      console.log(error);
    });
}


gettransferreqbyID(tranferrequestID){
  var self = this;
  axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/transfers/${tranferrequestID}`)
      .then(function (response) {
        console.log(response);
        self.editquantity = response.data.quantity;
        self.previouseditquantity = response.data.quantity;
        self.editfactorytransfersid = response.data.factoriestransfersid;
        self.invoices.push(response.data);
        // console.log(self.invoices);
        // self.invhubname = response.data.hub.name;
        // self.hubaddress1 = response.data.hub.address1;
        // self.hubaddress2 = response.data.hub.address2;
    })
      .catch(function (error) {
        console.log(error);
      });
}

onPrint(){
  window.print();
}

gethub(){
  var self = this;
  console.log(self.selectedhub);
 axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/profiles/${self.selectedhub}`)
      .then(function (response) {
        console.log(response);
        self.hubselected = response.data.name;
    })
    .catch(function (error) {
      console.log(error);
    });
}
hubassign(hubID){
    this.selectedhub = hubID;
    this.gettransferbyhubID();
}

acceptall(){
  var self = this;
console.log(self.factorytransferlength);
  for(var i = 0; i<self.factorytransferlength; i++){


 console.log(self.factorytransfersbyhub[i].factoriestransfersid);
  axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/approve/transfers/${self.factorytransfersbyhub[i].factoriestransfersid}`)
      .then(function (response) {
        console.log(response);  
        self.transferflag = false;
      })
      .catch(function (error) {
        console.log(error);
      });

    }
    self.factorytransfer(); 
}

gettransferbyhubID(){
  var self = this;
  if(self.oddvalue != self.selectedhub){
    self.transferflag = false;
  }

    // console.log(self.selectedhub);
  // self.gethub();
  axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/transfers?factoriestransfers[status]=1&hubs[hubsid]=${self.selectedhub}`)
      .then(function (response) {
        //  console.log(response);
      self.transferlength = response.data.length;
        self.oddvalue = self.selectedhub;
        if(response.data.length != 0){
          // console.log(response.data.length)
          self.transferflag = true;
        }
        self.flag = true;
        self.factorytransfersbyhub = response.data;
        self.factorytransferlength = response.data.length;
        for(let key in response.data){
          response.data[key].hubname = response.data[key].hub.name;
          response.data[key].productname = response.data[key].product.name;
        }
        // self.getallhubs();
      })
      .catch(function (error) {
        console.log(error);
      });
}


factorytransferreject(){
  var self = this;
  console.log(self.factorytransferid);
  axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/approve/transfers/${this.factorytransferid}`)
      .then(function (response) {
        console.log(response);   
      
            
      if(response){
        Swal.fire({
          position: 'top',
          type: 'success',
          title: 'Tranfer request rejected',
          showConfirmButton: false,
          timer: 1500
        })
      }
      
      self.factorytransfer(); 
      
      })
      .catch(function (error) {
        console.log(error);
      });
}

generatewaybill(){
  var self = this;

  if(self.model.date.month == 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9)
  {
    self.addmonth = '0'+self.model.date.month;
  }
  if(self.model.date.day == 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9)
  {
    self.addday = '0'+self.model.date.day;
  }

  self.deliverydate = self.model.date.year + '-' + self.addmonth+ '-' +self.addday+'T00:00:00.000Z';

  console.log( self.deliverydate);
  axios.post(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/waybills/profiles`,{
      "hubsid": self.hubsid,
      "vansid": null,
      "supplytype": "Outward",
      "subsupplytype": "Supply Sales",
      "doctype": "Bill of Supply",
      "tranmode": "Road",
      "unit": "Pack",
      "date": self.deliverydate,
      "status": "1"
  })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
}

factorytransferapproval(){
  var self = this;
  console.log(self.factorytransferid);


  axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/approve/transfers/${this.factorytransferid}`)
      .then(function (response) {
        console.log(response);  
 

        if(response){
          Swal.fire({
            position: 'top',
            type: 'success',
            title: 'Tranfer request approved',
            showConfirmButton: false,
            timer: 1500
          })
        } 
        self.factorytransfer(); 
        self.generatewaybill();
        self.getallhubs();
      })
      .catch(function (error) {
        console.log(error);
      });
}

editedtransferreq(){
  var self = this;
  console.log(self.editfactorytransfersid);

  if(self.editquantity > self.previouseditquantity){
    Swal.fire({
      position: 'top',
      type: 'warning',
      title: 'Quantity cannot be more than requested',
      showConfirmButton: false,
      timer: 1500
    })
} 
if(self.editquantity == self.previouseditquantity){

  $("#editclose").click();
}
else{


  axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/factories/transfers/${self.editfactorytransfersid}`,{
      "quantity" : self.editquantity
  })
      .then(function (response) {
        console.log(response);  
        if(response){
          Swal.fire({
            position: 'top',
            type: 'success',
            title: 'Quantity Edited',
            showConfirmButton: false,
            timer: 1500
          })
        } 
        self.factorytransfer(); 
        $("#editclose").click();
      })
      .catch(function (error) {
        console.log(error);
      });
}
}

}