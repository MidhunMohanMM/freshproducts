import { Component, OnInit } from '@angular/core';
import {ExcelService} from '../services/excel.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  data: any = [{
    SlNo: '1',
    Invoice_Number: 'G1528714349',
    Invoice_Date : '2018-06-11',
    Van_Number : 'KL07BK2834',
    Invoice_Amount : '20'
    },{
      SlNo: '2',
      Invoice_Number: 'G1528714351',
      Invoice_Date : '2018-06-11',
      Van_Number : 'KL07BK2834',
      Invoice_Amount : '20'
    },{
      SlNo: '3',
      Invoice_Number: 'G1528714391',
      Invoice_Date : '2018-06-11',
      Van_Number : 'KL07BK2834',
      Invoice_Amount : '20'
    },{
      SlNo: '4',
      Invoice_Number: 'G1528714643',
      Invoice_Date : '2018-06-11',
      Van_Number : 'KL07BK2834',
      Invoice_Amount : '20'
    }];




  constructor(private excelService:ExcelService) { }

  ngOnInit() {
  }
    
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.data, 'invoice');
 }


}
