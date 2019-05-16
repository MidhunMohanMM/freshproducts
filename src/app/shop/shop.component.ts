import { Component, OnInit } from '@angular/core';
import {ExcelService} from '../services/excel.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  
  data: any = [{
    SlNo: '1',
    Name: 'Reliance Fresh',
    Hub: 'Edappally',
    Route : 'Mannam Karingamthuruth Rd',
    Address : '631A/1, Ground Floor, Ambadi Towers, P O Edappally, Kochi, Kerala 682024'
    },{
      SlNo: '2',
      Name: 'Supplyco Supermarket',
      Hub: 'Vazhakkala',
      Route : 'Kunneparambu Rd',
      Address : 'Thrikkakara, Vazhakkala, Kakkanad, Kerala 682021'
    },{
      SlNo: '3',
      Name: 'More',
      Hub: 'Kochi',
      Route : 'Sea Port-Air Port Road',
      Address : 'Image Buildings Near TV Center, sea Port-air Port Road, Kochi, Kerala 682031'
    }];


    constructor(private excelService:ExcelService) { }

    ngOnInit() {
    }
      
    exportAsXLSX():void {
      this.excelService.exportAsExcelFile(this.data, 'shop');
   }
  

}
