import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
import {IMyDpOptions} from 'mydatepicker';
import { AppGlobals } from '../app.global';
import swal from 'sweetalert';
import $ from "jquery";
import axios from "axios";
import Swal from 'sweetalert2';
import { ItemsList } from '@ng-select/ng-select/ng-select/items-list';
@Component({
  selector: 'app-ewaybill',
  templateUrl: './ewaybill.component.html',
  styleUrls: ['./ewaybill.component.css'],
  providers: [AppGlobals]
})
export class EwaybillComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {

    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    showClearDateBtn: false,
    inline: false,
    monthLabels: { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' }
};

public model: any = { date: { year: 2019, month: 10, day: 9 } };


  routeList:any 
  vanList:any
  van: any = "";
  vanEbill:any ;
  selectedrouteinview: any = "";
  selectedvan: any = "";
  selectedroute: any = "";
  selectedroute1: any;
  flag: any = ""; 
  items: any = "";
  vanname: any;
  regno: any;
  routename: any;
  number: any;
  hubuserid: any;
  hubname: any;
  expanded: boolean = false;
  search: any = "";
  username: any;
  totalmrp: any = 0;
  hubusertypeid: any;
  key: any = "hubname";
  reverse: boolean;
  search1: any = "";
  addmonth: string;
  deliverydate: string;
  addday: string;
  waybillsid: any;
  waybillprofile: any;
  selectedproduct :any[] = [];
  selectedquantity:any[] = [];
  mrp:any[] = [];
  mrpflag: any = "";
  mrpflag1 :any[] = [];
  products: any;
  allproducts: any;
  quantity: any;
  dropdownSettings = {};
  dropdownSettingsofvan = {};
  dropdownSettingsofproduct = {};
  mrpprod: any;
  dropdownSettingsofroute = {};
  waybills: any;
  singlewaybilljson: any;
  public p: any;
  selectedsubtype: any = "";
  hubsid: any;
  selectedvanedit: any = "";
  editwaybillsid: any;
  waybilldetails: any;
  waybillsdetailsid : any = "";
  users: Object; // <-- Do not use $ at the end of a variable unless it is an observable
  loading = true;
  singlewaybilljson1: any;
  doctype: string;
  supplytype: string;
  subsupplytype: string;
  tranmode: string;
  unit: string;
  
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(  private route : ActivatedRoute ,  private router: Router, private _location: Location, private _global: AppGlobals) {
    this.route.params.subscribe(params => {
      console.log(params);
      this.number = params;
      this.hubuserid = this.number.id;
      console.log(this.hubuserid);
      });
   }

  ngOnInit() {
    this.getallroutes();
    this.getallvans();
    console.log(this.flag);
    this.gethubuser();
    this.getproducts();
    this.getwaybills();
    for(let i = 0; i<=10; i++)
    this.selectedproduct[i] = "";
    var today = new Date();
    console.log(today);
    this.model.date.day = today.getDate();
    this.model.date.month = today.getMonth() + 1;
    this.model.date.year = today.getFullYear() ;

    this.dropdownSettingsofroute = {
      singleSelection: true,
      idField: 'routesid',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    }
       
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'name',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };

    this.dropdownSettingsofvan = {
      singleSelection: true,
      idField: 'vansid',
      textField: 'nameregno',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };

    this.dropdownSettingsofproduct = {
      singleSelection: true,
      idField: 'productsid',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };


  }

  onItemSelect(item: any) {
    console.log(item);
    this.selectedroute = item.name;
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  changeflag(){
    var self = this;
    self.mrpflag = true;
  }

  getewaybillbysubtype(){
    var self = this;
    if(self.selectedsubtype == ""){
      self.waybills = []
      self.getwaybills();
    }
    else{
      axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/waybills/profiles?waybills[subsupplytype]=${self.selectedsubtype}`)
      .then(function (res) {
        console.log(res);
        for(let key in res.data){
            res.data[key].waybillvanname = res.data[key].van.name + '- ' + res.data[key].van.regno;
          if(res.data[key].route){
            res.data[key].waybillroutename = res.data[key].route.name;
            res.data[key].waybillhubname = res.data[key].route.hub.name;
          }
  
            // res.data[key].waybilldate = res.data[key].waybill.date;
              var d = new Date(res.data[key].date); 
              var date = d.getUTCDate();
              var month = d.getUTCMonth() + 1;
              var year = d.getUTCFullYear();
              res.data[key].newdate = date + ' -' + month+ ' -' +year;
              // res.data[key].productname = res.data[key].product.name;
        }
        self.waybills = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
  }


  getwaybills(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/waybills/profiles?routes[hubsid]=${self.hubsid}`)
        .then(function (res) {
          self.loading = false;
          console.log(res);
          for(let key in res.data){
            if(res.data[key].van){
              res.data[key].waybillvanname = res.data[key].van.name + '- ' + res.data[key].van.regno;
               res.data[key].vanroutename = res.data[key].van.route.name;
            }
            if(res.data[key].hub){
              res.data[key].hubname = res.data[key].hub.name;
            }
            
              // res.data[key].waybilldate = res.data[key].waybill.date;
                var d = new Date(res.data[key].date); 
                var date = d.getUTCDate();
                var month = d.getUTCMonth() + 1;
                var year = d.getUTCFullYear();
                res.data[key].newdate = date + ' -' + month+ ' -' +year;
                // res.data[key].productname = res.data[key].product.name;

                // if(res.data[key].hubsid == self.hubsid){
                //   self.waybills.push(res.data[key]);
                // }


          }
          console.log(self.waybills);
          self.waybills = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
  }


  getproducts(){

    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/products/profiles?products[status]=1`)
        .then(function (res) {
          console.log(res);
          self.products = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getmrp(x){
    var self = this; 
    console.log("hi");
    console.log(self.selectedproduct[x]);
    self.mrpprod = self.selectedproduct[x]
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/products/profiles/${self.mrpprod[0].productsid}`)
        .then(function (res) {
          console.log(res);
          self.allproducts = res.data;
          console.log(self.mrp[x]);
          var oldvalue = 0;
          if(self.mrp[x] != undefined){
               oldvalue = self.mrp[x];
          }

          self.mrp[x] = res.data.mrp * self.selectedquantity[x];

          var previoustotalmrp = self.totalmrp;
          var totalmrp = previoustotalmrp + parseInt(self.mrp[x]);
          
          if(self.mrp[x] == undefined){
              self.totalmrp = totalmrp 
              console.log(self.totalmrp);
          }
          else{
              self.totalmrp = totalmrp - oldvalue;
              console.log(self.totalmrp);
          }

        

        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getorderbydeliverydate(){

  }

  getewaybilldetailID(waybillID){
    var self = this;
    self.expanded = true;
    
    $('html,body').animate({ scrollTop: 750 }, 600);

    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/waybills/details?waybillsdetails[waybillsid]=${waybillID}`)
        .then(function (res) {
          console.log(res);
          self.waybilldetails = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  addwaybillprofile(){
    var self = this;
    console.log("hi");
    console.log(self.selectedroute1);
    console.log(self.selectedvan);
    console.log(self.model);
    console.log(self.selectedproduct);
    if(self.model.date.month == 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9)
    {
      self.addmonth = '0'+self.model.date.month;
    }
    if(self.model.date.day == 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9)
    {
      self.addday = '0'+self.model.date.day;
    }
    console.log()
    self.deliverydate = self.model.date.year + '-' + self.addmonth+ '-' +self.addday+'T00:00:00.000Z';
    console.log(self.deliverydate);
    
    axios.post(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/waybills/profiles`,{
      "routesid": self.selectedroute1[0].routesid,
      "vansid": self.selectedvan[0].vansid,
      "date": self.deliverydate,
      "status": "1"
    })
        .then(function (res) {
          console.log(res);
          self.waybillsid = res.data.waybillsid;
          console.log(self.selectedquantity);
          console.log( self.selectedproduct);
          console.log(self.waybillsid);
          for(var i = 0; i < self.items; i++){
            console.log(self.selectedproduct[i][0]);
              axios.post(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/waybills/details`,{
                "waybillsid": self.waybillsid ,
                "productsid": self.selectedproduct[i][0].productsid,
                "quantity": self.selectedquantity[i],
                "status": "1"
             })
                .then(function (res) {
                  console.log(res);    
                })
                .catch(function (error) {
                  console.log(error);
                });
          }

          if(res){
            Swal.fire({
              position: 'top',
              type: 'success',
              title: 'E-WayBill Generated',
              showConfirmButton: false,
              timer: 1500
            })
          }
          self.selectedroute = '';
          self.selectedvan = '';
          self.items = '';
          self.totalmrp = '';
        })
        .catch(function (error) {
          console.log(error);
        });

        
  }

  getwaybillprofilebyID(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/waybills/profiles/${self.waybillsid}`)
        .then(function (res) {
          console.log(res);
          self.waybillprofile = res.data;
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
  

  
  getallroutes(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/routes/profiles?routes[status]=1`)
        .then(function (res) {
          console.log(res);
          self.routeList = res.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

checkstatus(id){
  var self = this;
  axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/waybills/profiles/${id}`)
      .then(function (res) {
        console.log(res);
          if(res.data.status == 2){
            swal("You have exported JSON already, are you sure you want to do this?", {
              buttons: ["No!", "Yes!"],
            })
            .then((value) => {
              console.log(value);
              switch (value) {
                
                case true:
                self.exportasjson(id);
                self.editstatus(id);
                  // swal("Pikachu fainted! You gained 500 XP!");
                  break;
             
                default:
                  // swal("Got away safely!");
              }
            });
          }
          else if(res.data.status == 1){
            self.exportasjson(id);
            self.editstatus(id);
      }
        
      })
      .catch(function (error) {
        console.log(error);
      });
        
  
}


editstatus(id){
  var self = this;
  axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/waybills/profiles/${id}`,{
    "status" : "2"
  })
  .then(function (res) {
    console.log(res);
    
  })
  .catch(function (error) {
    console.log(error);
  });
}
  
  exportasjson(id){
    var self = this;
    // self.checkstatus(id);



       axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/waybills/profiles/${id}`)
        .then(function (res) {
          console.log(res);

          // if(res.data.status == 2){
          //   swal("You have exported JSON already, are you sure you want to do this?", {
          //     buttons: ["No!", "Yes!"],
          //   });
          // }
          // else{

        


          self.singlewaybilljson = res.data;
          var key = "waybillsid";
          delete self.singlewaybilljson[key];
          var key = "hubsid";
          delete self.singlewaybilljson[key];
          var key = "vansid";
          delete self.singlewaybilljson[key];
          var key = "status";
          delete self.singlewaybilljson[key];

          var key = "van";
          if(self.singlewaybilljson[key] == null){
              Swal.fire({
                position: 'top',
                type: 'warning',
                title: 'Please assign a van',
                showConfirmButton: false,
                timer: 1500
              })
          }
          else{

            if(res.data.doctype == "Bill of Supply"){
              self.doctype = "BIL"
            }
            else{
              self.doctype = "INV"
            }

            if(res.data.supplytype == "Outward"){
              self.supplytype = "I"
            }
            else{
              self.supplytype = "O"
            }

            if(res.data.supplytype == "Line Sales"){
              self.subsupplytype = "10"
            }
            else{
              self.subsupplytype = "1"
            }

            if(res.data.tranmode == "Road"){
              self.tranmode = "1"
            }
            else{
              self.tranmode = "2"
            }

            if(res.data.unit == "Pack"){
              self.unit = "PAC"
            }
            else{
              self.unit = "BOX"
            }



            // self.singlewaybilljson1.version = "1.0.0618";


          var billLists = {
              version:"1.0.0618",
              "billLists" : [{
              "userGstin":"29BQSPA3829E124",
              "supplyType":self.supplytype,
              "subSupplyType":self.subsupplytype,
              "docType":self.doctype,
              "docNo":"1234",
              "docDate":"04/03/2017",
              "fromGstin":"29BQSPA3829E124",
              "fromTrdName":"HUKKERI PVT LTD",
              "fromAddr1":"OLD AIRPORT ROAD",
              "fromAddr2":"OLD AIRPORT ROAD",
              "fromPlace":"CHANGANASSERY",
              "fromPincode":560090,
              "fromStateCode":29,
              "actualFromStateCode":29,
              "toGstin":"29AAACG0569P1Z3",
              "toTrdName":"AMBUJA PVT LTD",
              "toAddr1":"MG ROAD",
              "toAddr2":"MG ROAD",
              "toPlace":"BANGALORE",
              "toPincode":560090,
              "toStateCode":29,
              "actualToStateCode":29,
              "totalValue":678,
              "cgstValue":6102,
              "sgstValue":6102,
              "igstValue":0,
              "cessValue":0,
              "transMode":self.tranmode,
              "transDistance":567,
              "transporterName":"",
              "transporterId":"",
              "transDocNo":"",
              "transDocDate":"",
              "vehicleNo":"KA12KA1234",
              "vehicleType":"R",
              "totInvValue":12882,
              "mainHsnCode":26180000,
              "itemList":[{
              "itemNo":1,
              "productName":"STEEL",
              "productDesc":"STEEL",
              "hsnCode":26180000,
              "quantity":56,
              "qtyUnit": self.unit,
              "taxableAmount":678,
              "sgstRate":9,
              "cgstRate":9,
              "igstRate":0,
              "cessRate":0
              }
              
              ]
              }]
          };

            // self.singlewaybilljson1 = billLists;
        
  
          console.log(self.singlewaybilljson)
  
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(billLists));
      var dlAnchorElem = document.getElementById('downloadAnchorElem');
      console.log(encodeURIComponent(JSON.stringify(billLists)));
      dlAnchorElem.setAttribute("href",     dataStr     );
      dlAnchorElem.setAttribute("download", "waybill.json");
      dlAnchorElem.click();
    }
  // }
        })
        .catch(function (error) {
          console.log(error);
        });


        
  }

  editewaybill(){
    var self = this;
    axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/waybills/profiles/${self.editwaybillsid}`,{
        "vansid" : self.selectedvanedit
    })
        .then(function (res) {
          console.log(res);
          if(res){
            Swal.fire({
              position: 'top',
              type: 'success',
              title: 'Van Added',
              showConfirmButton: false,
              timer: 1500
            })
          }
          $("#editclose").click();
          self.getwaybills();
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getallvans(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/vans/profiles`)
        .then(function (res) {
          console.log(res);
          
            for (let key in res.data){
              if(res.data[key].route!= null){

              res.data[key].routename = res.data[key].route.name;
            }
            else{
              res.data[key].routename = "NULL";
            }
            res.data[key].nameregno = res.data[key].name + " - " + res.data[key].regno;
          }
         
          self.vanList = res.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getvanbyroute(){
    var self = this;
    console.log(self.selectedroute);
    if(self.selectedroute != ""){
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/vans/profiles?routes[routesid]=${self.selectedroute}` )
        .then(function (response) {
          console.log(response);


          for (let key in response.data){
            response.data[key].routename = response.data[key].route.name;
          }



          self.vanList = response.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else{
        self.getallvans();
    }
  }



  getwaybillbyID(waybillsID){
    var self = this;
    self.editwaybillsid = waybillsID;
    // console.log(self.selectedvan);
    // if(self.selectedvan != ""){
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/waybills/profiles/${waybillsID}` )
        .then(function (response) {
          console.log(response);
          if( response.data.vansid != null)
          self.selectedvanedit = response.data.vansid;
          else{
            self.selectedvanedit = "";
          }
          console.log(self.selectedvanedit);
        })
        .catch(function (error) {
          console.log(error);
        });

      // }
      // else{
      //   axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/vans/profiles/${self.selectedvan}` )
      //   .then(function (response) {
      //     console.log(response);
      //     self.flag = false;
      //     for (let key in response.data){
      //       response.data[key].routename = response.data[key].route.name;
      //     }
      //      self.vanList = response.data;
          
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      // }
  }






}
