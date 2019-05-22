import { Component, OnInit } from '@angular/core';
import axios from "axios";
import $ from "jquery";
import Swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router';
import { NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import {ExcelService} from '../services/excel.service';
import { AppGlobals } from '../app.global';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [AppGlobals]
})
export class OrdersComponent implements OnInit {
  selectedhub:any="";
  itemname: any  = "Add Item";
  i: any = "0";
  selectProduct:any="";
  key: string = 'name'; //set default
  reverse: boolean = false;
  search1: any = "";
  selectedstock: string;
  singlestockitems: any = [];
  productList:any = [];
  orders: any;
  quantity: any = "";
  productarray: any = [];
  productname: any;
  unit: any;
  preorderlength: any;
  public p: any;
  number: any;
  loading:boolean = true;
  hubuserid: any;
  hubsid: any;
  hubname: any;
  username: any;
  hubusertypeid: any;
  dropdownSettingsofproduct = {};
  placedorders: any;
  transferflag: boolean = false ;

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }


  colorchange(key){
    // this.key = key;
    this.reverse = !this.reverse;
   
    if(this.i %2 == 1){
      this.itemname = "Add Item";
      this.singlestockitems = [];
    }
    else{
      this.itemname = "Remove Item"
    }
    this.i ++;

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
    $("#addProQnty").hide();
    // this.gethubstock();
    // this.getallhubs();
    this.getProducts();

    $(window).scroll(function(){ 
      if ($(this).scrollTop() > 100) { 
          $('#scroll').fadeIn(); 
      } else { 
          $('#scroll').fadeOut(); 
      } 
  }); 
  $('#scroll').click(function(){ 
    
  var WH = $(window).height();  
  var SH = $('body').prop("scrollHeight");
  $('html, body').stop().animate({scrollTop: SH-WH}, 1000);
        return false;
  }); 
    
    // this.getorderdetails();

    this.dropdownSettingsofproduct = {
      singleSelection: true,
      idField: 'productsid',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      closeDropDownOnSelection: true,
      allowSearchFilter: true
    }
  }


  onItemDeSelect(item: any) {
    // console.log("item");
    // this.selectedroute = item.name;
  }

  onItemSelect(item: any) {
    console.log(item);
    // this.selectedroute = item.name;
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  scroll(){
    var WH = $(window).height();  
    var SH = $('body').prop("scrollHeight");
    $('html, body').stop().animate({scrollTop: SH-WH}, 1000);
          return false;
  }


  gethubuser(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/users/profiles/${ this.hubuserid}` )
    .then(function (res) {
          // console.log(res);
          self.hubsid = res.data.hubsid;
          self.hubname = res.data.hub.name;
          self.username = res.data.name;
          self.hubusertypeid = res.data.hubsuserstypesid;
          self.getplacedorders();
          if(self.hubusertypeid == '1'){
            self.router.navigate(['']);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  
  getorderdetails(){
    var self = this;
    axios.get('http://103.214.233.141:2981/v1/secure/customers/orders/details' )
        .then(function (response) {
          console.log(response);
          self.orders = response.data;
          self.preorderlength = response.data.length;
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  addproduct(){
    var self = this;
    console.log(self.selectProduct);
    if(self.selectProduct.length != 0){
      for(let key in self.selectProduct){
      axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/products/profiles/${self.selectProduct[key].productsid}` )
      .then(function (response) {
        console.log(response);
        console.log(self.selectProduct[key]);
        self.productname = response.data.name;
        self.unit = response.data.unit;
        var array = {
          "productname" : self.productname,
          "unit": self.unit,
          "productsid" : self.selectProduct,
          "status" : "1",
          "quantity" : self.quantity
        };
        self.productarray.push(array);
        console.log(self.productarray[0].quantity);
        self.selectProduct = "";
        console.log(key);
        if(key == '0'){
          self.quantity = ""
        }
        // self.quantity = "";
        if(response){
          Swal.fire({
            position: 'top',
            type: 'success',
            title: 'Product is Added',
            showConfirmButton: false,
            timer: 1500
          })
        }
        $("#addProQnty").show();
        $('html,body').animate({ scrollTop: $(document).height()  }, 600)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
            
  }
  // self.quantity = "";
  }


  deleteProduct(prodID){
      for(let key in this.productarray){
        if(prodID == this.productarray[key].productsid){
          this.productarray.splice(key, 1);
        }
      }
  }

  getplacedorders(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/factories/transfers?factoriestransfers[status]=1&hubs[hubsid]=${self.hubsid}`)
        .then(function (response) {
          if(response.data.length != 0){
            self.transferflag = true;
          }
          console.log(response);
          for(let key in response.data){
            response.data[key].hubname = response.data[key].hub.name;
            response.data[key].productname = response.data[key].product.name;

            var d = new Date(response.data[key].updatedAt); 
            var date = d.getUTCDate();
            var month = d.getUTCMonth();
            var year = d.getUTCFullYear();
            var hour = d.getUTCHours();
            var min = d.getUTCMinutes();
            var ampm = hour >= 12 ? 'pm' : 'am';
            hour = hour % 12;
            hour = hour ? hour : 12; // the hour '0' should be '12'
            var mins = min < 10 ? '0'+min : min;
            var strTime = hour + ':' + mins + ' ' + ampm;

            response.data[key].date = date + '-' + month+ '-' +year+ ' ' + strTime;
          }

          
          self.placedorders = response.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  placeorder(){
    var self = this;

    console.log(self.productarray);

      for (let key in self.productarray){
     
   
        axios.post(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/factories/initialise/transfers`,{
          "factoriesid" : "1",
          "hubsid" : self.hubsid,
          "status" : "1",
          "productsid" : self.productarray[key].productsid[0].productsid,
          "quantity" : self.productarray[key].quantity
        })
            .then(function (res) {
              console.log(res);
              if(res){
                        Swal.fire({
                          position: 'top',
                          type: 'success',
                          title: 'Order is placed',
                          showConfirmButton: false,
                          timer: 1500
                        })
                      }
                      self.productarray = [];
                      $("#addProQnty").hide();
            })
            .catch(function (error) {
              console.log(error);
            });
          }


  }


  
  placeordernew(){
    var self = this;
   for (let key in self.productList){

     console.log(self.productList[key]);
     var id = self.productList[key].productsid;

     console.log($('#'+id+'product').val());
     var quantity = $('#'+id+'product').val()

     if(quantity != ""){

      $('#'+id+'product').val("");
     
   
        axios.post(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/factories/initialise/transfers`,{
          "factoriesid" : "1",
          "hubsid" : self.hubsid,
          "status" : "1",
          "productsid" : id,
          "quantity" : quantity
        })
            .then(function (res) {
              console.log(res);
              if(res){
                        Swal.fire({
                          position: 'top',
                          type: 'success',
                          title: 'Order is placed',
                          showConfirmButton: false,
                          timer: 1500
                        })
                      }
            })
            .catch(function (error) {
              console.log(error);
            });


      }
    }

  }

  getProducts(){
    var self = this;
    axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/products/profiles?products[status]=1`)
        .then(function (res) {
          self.loading = false;
          console.log(res);
          self.productList = res.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }
addItem(){
     $("#addProQnty").show();
     $('html,body').animate({ scrollTop: $(document).height()  }, 600)
}
 
}