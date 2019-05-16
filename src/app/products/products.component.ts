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
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [AppGlobals]
})
export class ProductsComponent implements OnInit {

  data: any = [{
    SlNo: '1',
    Name: 'G1528714349',
    Unit: '2018-06-11',
    HSN_Code : 'KL07BK2834',
    Barcode : '20',
    GSTPRC: '12',
    ProductWRate : '67',
    ProductMRP : '100'
    },{
      SlNo: '2',
      Name: 'G1528714349',
      Unit: '2018-06-11',
      HSN_Code : 'KL07BK2834',
      Barcode : '20',
      GSTPRC: '12',
      ProductWRate : '67',
      ProductMRP : '100'
    },{
      SlNo: '3',
      Name: 'G1528714349',
      Unit: '2018-06-11',
      HSN_Code : 'KL07BK2834',
      Barcode : '20',
      GSTPRC: '12',
      ProductWRate : '67',
      ProductMRP : '100'
    },{
      SlNo: '4',
      Name: 'G1528714349',
      Unit: '2018-06-11',
      HSN_Code : 'KL07BK2834',
      Barcode : '20',
      GSTPRC: '12',
      ProductWRate : '67',
      ProductMRP : '100'
    }];
  products: any;
  number: any;
  hubuserid: any;
  hubname: any;
  username: any;
  hubusertypeid: any;
  name:any
  unit:any
  hsnCode:any
  barcode:any
  gstprc:any
  prodWrate:any
  public p: any;
  prodmrp:any
  productsid:any;
  key: string = 'name';
  loading: boolean = true;
  reverse: boolean;
  search1: any = "";
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  public popoverTitle: string = 'Delete Product';
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
    this.getallproducts();
    this.gethubuser();
  }

  
  gethubuser(){
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/hubs/users/profiles/${this.hubuserid}`)
        .then(function (res) {
          // console.log(res);
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
    this.excelService.exportAsExcelFile(this.data, 'product');
 }

 getallproducts(){
  var self = this;
  axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/products/profiles?products[status]=1` )
      .then(function (response) {
        self.loading = false;
         console.log(response);
        self.products = response.data;
        
      })
      .catch(function (error) {
        console.log(error);
      });
}
addNewProduct(){
 if(this.name == undefined ||  this.name == ''){
    $("#product_name_error").html("Please enter name").show().fadeOut(2000);
   }else if(this.unit == undefined ||  this.unit == ''){
    $("#product_unit_error").html("Please enter unit").show().fadeOut(2000);
   }else if(this.hsnCode == undefined ||  this.hsnCode == ''){
    $("#product_hsnCode_error").html("Please enter hsnCode").show().fadeOut(2000);
   }else if(this.barcode == undefined ||  this.barcode == ''){
    $("#product_barcode_error").html("Please enter barCode").show().fadeOut(2000);
   }else if(this.gstprc == undefined ||  this.gstprc == ''){
    $("#product_gstprc_error").html("Please enter gstprc").show().fadeOut(2000);
  }else if(this.prodWrate == undefined ||  this.prodWrate == ''){
    $("#product_prodWrate_error").html("Please enter prodWare").show().fadeOut(2000);
  }else if(this.prodmrp == undefined ||  this.prodmrp == ''){
    $("#product_prodmrp_error").html("Please enter prodmrp").show().fadeOut(2000);
  }else{
    {
      var self = this;
      
     var hub_info ={
      "name": this.name,
      "unit": this.unit,
      "hsn_code": this.hsnCode,
      "barcode": this.barcode,
      "crmid": "1",
      "gst_perc": this.gstprc,
      "wrate": this.prodWrate,
      "mrp": this.prodmrp,
      "status" : "1"
     }
      console.log(hub_info);
     axios.post(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/products/profiles`,hub_info
     ).then(function (res) {
 
        console.log(res);
      //  localStorage.setItem('contact_info', JSON.stringify(res.data));
       
       if(res){
        Swal.fire({
          position: 'top',
          type: 'success',
          title: 'Product is Added',
          showConfirmButton: false,
          timer: 1500
        })
      }
      self.name = '';
       self.unit = '';
       self.hsnCode = '';
       self.barcode = '';
       self.gstprc = '';
       self.prodWrate = '';
       self.prodmrp = '';
       self.getallproducts();
     })
     .catch(function (error) {
       console.log(error);
     });
 
    }
  }
}
getProductbyID(productsid){
  var self = this;
  axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/products/profiles/${productsid}`)
      .then(function (response) {
        self.name = response.data.name;
       self.unit = response.data.unit;
       self.hsnCode = response.data.hsn_code;
       self.barcode = response.data.barcode;
       self.gstprc = response.data.gst_perc;
       self.prodWrate = response.data.wrate;
       self.prodmrp = response.data.mrp;
       self.productsid = response.data.productsid;
      
      })
      .catch(function (error) {
        console.log(error);
      });     
}
editProduct(){
  if(this.name == undefined ||  this.name == ''){
    $("#productEdit_name_error").html("Please enter name").show().fadeOut(2000);
   }else if(this.unit == undefined ||  this.unit == ''){
    $("#productEdit_unit_error").html("Please enter unit").show().fadeOut(2000);
   }else if(this.hsnCode == undefined ||  this.hsnCode == ''){
    $("#productEdit_hsnCode_error").html("Please enter hsnCode").show().fadeOut(2000);
   }else if(this.barcode == undefined ||  this.barcode == ''){
    $("#productEdit_barcode_error").html("Please enter barCode").show().fadeOut(2000);
   }else if(this.gstprc == undefined ||  this.gstprc == ''){
    $("#productEdit_gstprc_error").html("Please enter gstprc").show().fadeOut(2000);
  }else if(this.prodWrate == undefined ||  this.prodWrate == ''){
    $("#productEdit_prodWrate_error").html("Please enter prodWare").show().fadeOut(2000);
  }else if(this.prodmrp == undefined ||  this.prodmrp == ''){
    $("#productEdit_prodmrp_error").html("Please enter prodmrp").show().fadeOut(2000);
  }else{
    {
      var self = this;
      
 
     axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/products/profiles/${self.productsid}`,{
      "name": this.name,
      "unit": this.unit,
      "hsn_code": this.hsnCode,
      "barcode": this.barcode,
      "crmid": "1",
      "gst_perc": this.gstprc,
      "wrate": this.prodWrate,
      "mrp": this.prodmrp,
      "status" : "1"
     })
 
     .then(function (response) {
    
      if(response){
        Swal.fire({
          position: 'top',
          type: 'success',
          title: 'Product is Edited',
          showConfirmButton: false,
          timer: 1500
        })
      }
      $('#editclose').click();
      self.getallproducts();
})
    .catch(function (error) {
      console.log(error);
    });
 
    }
  }
}
deleteProduct(productsid){
  var self = this;

  if(self.confirmClicked == true){
  axios.put(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/products/profiles/${productsid}`,{
    "status" : "0"
  })
      .then(function (response) {
       
        if(response){
          Swal.fire({
            position: 'top',
            type: 'success',
            title: 'Product Deleted',
            showConfirmButton: false,
            timer: 1500
          })
        }
        self.getallproducts();
        self.confirmClicked = false;
      })
      .catch(function (error) {
        console.log(error);
      });
    }
}
}