import { Component, OnInit } from '@angular/core';
import $ from "jquery";
import {ExcelService} from '../services/excel.service';
import {IMyDpOptions} from 'mydatepicker';
import axios from "axios";
import { AppGlobals } from '../app.global';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
  providers: [AppGlobals]
})
export class CollectionComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {

    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    showClearDateBtn: false,
    inline: false,
    monthLabels: { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' }
};

public model: any = { date: { year: 2019, month: 10, day: 9 } };


  data: any = [{
    System_Notes: 'D,C [3954]',
    Collection_Date: '2018-05-12',
    Collection_Amount: '3754',
    Cheque_Bank: 'Sbbj',
    Cheque_Amount: 0,
    Cash_Amount : 0
    },{
      System_Notes: 'D,C [3954]',
      Collection_Date: '2018-05-12',
      Collection_Amount: '3754',
      Cheque_Bank: 'Sbbj',
      Cheque_Amount: 0,
      Cash_Amount : 0
    },{
      System_Notes: 'D,C [3954]',
      Collection_Date: '2018-05-12',
      Collection_Amount: '3754',
      Cheque_Bank: 'Sbbj',
      Cheque_Amount: 0,
      Cash_Amount : 0
    }];
  hubuserid: any;
  hubsid: any;
  hubname: any;
  username: any;
  hubusertypeid: any;
  router: any;
  public p: any;

  constructor(private excelService:ExcelService, private _global: AppGlobals) { }

  ngOnInit() {
    console.log(this.model);
    this.gethubuser();
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.data, 'collection');
 }

 gethubuser(){
  var self = this;
  axios.get(`http://${this._global.baseUrl}:${this._global.port}/${this._global.version_no}/secure/hubs/users/profiles/${ this.hubuserid}`)
      .then(function (res) {
        console.log(res);
        self.hubsid = res.data.hubsid;
        self.hubname = res.data.hub.name;
        self.username = res.data.name;
        self.hubusertypeid = res.data.hubsuserstypesid;
        if(self.hubusertypeid == '1'){
          self.router.navigate(['']);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}
  hubStockTable() {
    throw new Error("Method not implemented.");
  }

}
