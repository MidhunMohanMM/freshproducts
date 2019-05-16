import { Component, OnInit } from '@angular/core';
import {ExcelService} from '../services/excel.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  data: any = [{
    SlNo: '1',
    Ledger: 'Biju K. (Driver)'
    },{
      SlNo: '2',
      Ledger: 'Ajeesh Chandran'
    },{
      SlNo: '3',
      Ledger: 'Nidhin V R(Driver)'
    },{
      SlNo: '4',
      Ledger: 'Sudheer M S(Driver)'
    }];


  constructor(private excelService:ExcelService) { }

  ngOnInit() {
  }

  
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.data, 'employee');
 }

}
