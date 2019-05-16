//@Angular Module Imports


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CountToModule } from 'angular-count-to';
import { NgxInfiniteScrollerModule } from 'ngx-infinite-scroller';
import { HttpClientModule } from '@angular/common/http';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { InfiniteScrollModule } from '@thisissoon/angular-infinite-scroll';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { FlxUiDatatableModule, FlxUiDataTable } from 'flx-ui-datatable' ;

//Custom npm plugins imports
import { ChartsModule } from 'ng2-charts';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxEasypiechartModule } from 'ngx-easypiechart';
import { EasyPieChartModule } from 'ng2modules-easypiechart';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import {DataTableModule} from "angular-6-datatable";
// import { PieChartComponent, BarChartComponent } from 'angular-d3-charts';

//Custom component imports

import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
// import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FreshsidebarComponent } from './freshsidebar/freshsidebar.component';
import { FreshhubComponent } from './freshhub/freshhub.component';
import { HubComponent } from './hub/hub.component';
import { CollectionComponent } from './collection/collection.component';
import { EmployeeComponent } from './employee/employee.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { VanroutesComponent } from './vanroutes/vanroutes.component';
import { VanComponent } from './van/van.component';
import { VanstocksComponent } from './vanstocks/vanstocks.component';
import { PreodersComponent } from './preoders/preoders.component';
import { WaybillComponent } from './waybill/waybill.component';
import { ShopComponent } from './shop/shop.component';
import { ExcelService } from './services/excel.service';
import { HubstockComponent } from './hubstock/hubstock.component';
import { EwaybillComponent } from './ewaybill/ewaybill.component';
import { FilterPipe } from './filter/filter.pipe';
import { SearchPipe } from './filter/search.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { PlaceorderComponent } from './placeorder/placeorder.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { TransferrequestComponent } from './transferrequest/transferrequest.component';
import { AcceptstockComponent } from './acceptstock/acceptstock.component';
import { VanroutelinkComponent } from './vanroutelink/vanroutelink.component';
import { EndtripComponent } from './endtrip/endtrip.component'; 
import {SlideshowModule} from 'ng-simple-slideshow';
import { OwlModule } from 'ngx-owl-carousel';
import { SettingsComponent } from './settings/settings.component';
import { OrderitemsComponent } from './orderitems/orderitems.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MyDatePickerModule } from 'mydatepicker';
import { AdminsidebarComponent } from './adminsidebar/adminsidebar.component';
import { CustomersComponent } from './customers/customers.component';
import { SprhubstockComponent } from './sprhubstock/sprhubstock.component';
import { FactoryComponent } from './factory/factory.component';
import { CustomerordersComponent } from './customerorders/customerorders.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { TripsComponent } from './trips/trips.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelect2Module } from 'ng-select2';
import { HubroutelinkComponent } from './hubroutelink/hubroutelink.component';
import { NewshopsComponent } from './newshops/newshops.component';
import { AdminnewshopsComponent } from './adminnewshops/adminnewshops.component';
import { ProgressBarModule } from "angular-progress-bar";
import { HubewaybillComponent } from './hubewaybill/hubewaybill.component';
import { ExportAsModule } from 'ngx-export-as';
import { HubdashboardComponent } from './hubdashboard/hubdashboard.component';
import { RejectordersComponent } from './rejectorders/rejectorders.component';
import { HubroutesComponent } from './hubroutes/hubroutes.component';
import { AdminroutesComponent } from './adminroutes/adminroutes.component';
import { HubfactoryComponent } from './hubfactory/hubfactory.component';
import { AdmininvoiceComponent } from './admininvoice/admininvoice.component';
import { AdmininvoicereportComponent } from './admininvoicereport/admininvoicereport.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


//@angularcomponent, custom component && plugins 

//import and export 

@NgModule({
  declarations: [
    AppComponent,
    AdminloginComponent,
    AdmindashboardComponent,
    FreshsidebarComponent,
    FreshhubComponent, 
    HubComponent,
    CollectionComponent, 
    EmployeeComponent, 
    InvoiceComponent, 
    OrdersComponent,
    ProductsComponent,
    VanroutesComponent,
    VanComponent,
    VanstocksComponent,
    PreodersComponent,
    WaybillComponent,
    ShopComponent,
    HubstockComponent,
    EwaybillComponent,
    FilterPipe,
    SearchPipe,
    PlaceorderComponent,
    TransferrequestComponent,
    AcceptstockComponent,
    VanroutelinkComponent,
    EndtripComponent,
    SettingsComponent,
    OrderitemsComponent,
    AdminsidebarComponent,
    CustomersComponent,
    SprhubstockComponent,
    FactoryComponent,
    CustomerordersComponent,
    TripsComponent,
    HubroutelinkComponent,
    NewshopsComponent,
    AdminnewshopsComponent,
    HubewaybillComponent,
    HubdashboardComponent,
    RejectordersComponent,
    HubroutesComponent,
    AdminroutesComponent,
    HubfactoryComponent,
    AdmininvoiceComponent,
    AdmininvoicereportComponent,
    ],
  imports: [
    ProgressBarModule,
    ExportAsModule,
    NgSelect2Module,
    NgSelectModule,
    FlxUiDatatableModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxEasypiechartModule,
    EasyPieChartModule,
    ProgressBarModule,
    NgMultiSelectDropDownModule.forRoot(),
    CountToModule,
    ChartsModule,
    NgxInfiniteScrollerModule,
    HttpClientModule,
    InfiniteScrollModule,
    NgScrollbarModule,
    NgxDatatableModule,
    NgxPaginationModule,
    Ng2OrderModule,
    SlideshowModule,
    OwlModule,
    PerfectScrollbarModule,
    MyDatePickerModule,
    SelectDropDownModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' 
    })
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },ExcelService,
FlxUiDataTable ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule);