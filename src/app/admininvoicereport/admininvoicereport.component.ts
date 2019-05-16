import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf'
// declare var html2pdf: any;
import * as $ from 'jquery';
import {ExcelService} from '../services/excel.service';
import {ActivatedRoute} from '@angular/router';
import axios from "axios";
import { Router } from '@angular/router';
import { AppGlobals } from '../app.global';

@Component({
  selector: 'app-admininvoicereport',
  templateUrl: './admininvoicereport.component.html',
  styleUrls: ['./admininvoicereport.component.css'],
  providers: [AppGlobals]
})
export class AdmininvoicereportComponent implements OnInit {


  jsPDF: any;
  number: any;
  invoiceid: any;
  invoicedetail: any;
  customername: any;
  address1: any;
  address2: any;
  vanno: any;
  dateofsupply: any;
  placeofsupply: any;
  customerheadingname: any;
  gstin: any;
  total: any = "0";
  
  

  
  constructor(private route : ActivatedRoute, private _global: AppGlobals) {
    this.route.params.subscribe(params => {
      console.log(params);
      this.number = params;
      this.invoiceid = this.number.id;
      console.log(this.invoiceid);
      });
   }



  ngOnInit() {


    this.invoicedetails();
  }

  invoicedetails(){
    
    var self = this;
    axios.get(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/secure/invoices/details?invoicesdetails[invoicesid]=${self.invoiceid}`)
        .then(function (res) {
          console.log(res);
          self.invoicedetail = res.data;
          if(res.data.length > 0){
            self.customername = res.data[0].invoice.order.customer.name;
            self.address1 = res.data[0].invoice.order.customer.address3;
            self.address2 = res.data[0].invoice.order.customer.address2;
            self.vanno =  res.data[0].invoice.van.regno;
            
            var d = new Date(res.data[0].invoice.order.deliverydate); 
            var date = d.getUTCDate();
            var month = d.getUTCMonth() + 1;
            var year = d.getUTCFullYear();
            self.dateofsupply = date + ' -' + month+ ' -' +year;

            // self.dateofsupply = res.data[0].invoice.order.deliverydate;
            self.placeofsupply = res.data[0].invoice.order.customer.address3;
            self.customerheadingname = res.data[0].invoice.order.customer.name;
            self.gstin = res.data[0].invoice.gst_no;
            
          }

          for(let key in res.data){
            self.total = parseInt(self.total) + res.data[key].product_amount;
          }
          // self.downloadPDF();
          setTimeout(self.downloadPDF,500);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  downloadPDF4(){
    var pdf = new jsPDF('p', 'pt', 'letter');
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    var source = $('#customers')[0];

    // we support special element handlers. Register them with jQuery-style 
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors 
    // (class, of compound) at this time.
    var specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function(element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return true
        }
    };
    var margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
            source, // HTML string or DOM elem ref.
            margins.left, // x coord
            margins.top, {// y coord
                'width': margins.width, // max width of content on PDF
                'elementHandlers': specialElementHandlers
            },
    function(dispose) {
        // dispose: object with X, Y of the last line add to the PDF 
        //          this allow the insertion of new lines after html
        pdf.save('Test.pdf');
    }
    , margins);
  }

  // downloadPDF3(){
  //   var element = document.getElementById('printable-area');

  //   html2pdf().from(element).set({
  //     margin: 1,
  //     filename: 'test.pdf',
  //     html2canvas: { scale: 2 },
  //     jsPDF: {orientation: 'portrait', unit: 'in', format: 'letter', compressPDF: true}
  //   }).save();
  // }

  downloadPDF2(){
    var options = {
      //'width': 800,
      };
      var pdf = new jsPDF('p', 'pt', 'a4');
      pdf.addHTML($("#printable-area"), -1, 220, options, function() {
        pdf.save('admit_card.pdf');
      });
  }


  downloadPDF(){
    let margins = {
      top: 80,
      bottom: 90,
      left: 40,
      width: 522
    };
  
  
  
  
    let doc = new jsPDF('l','in','a4');
    doc.internal.scaleFactor = 30;
    // doc.internal.pageSize.width = 8;
  
  doc.addHTML(document.getElementById('printable-area'),{
    pagesplit: false, 
    margin:{ top: 0,
          bottom: 0,   
  
    }
  },
  function() {
      doc.save('invoice.pdf');
  });
}
}