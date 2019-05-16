//@Angular Imports


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Custom component imports

import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { FreshsidebarComponent } from './freshsidebar/freshsidebar.component';
import { FreshhubComponent } from './freshhub/freshhub.component';
import { HubComponent } from './hub/hub.component';
import { CollectionComponent } from './collection/collection.component';
import { EmployeeComponent } from './employee/employee.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { HubroutesComponent } from './hubroutes/hubroutes.component';
import { VanComponent } from './van/van.component';
import { VanstocksComponent } from './vanstocks/vanstocks.component';
import { PreodersComponent } from './preoders/preoders.component';
import { WaybillComponent } from './waybill/waybill.component';
import { ShopComponent } from './shop/shop.component';
import { HubstockComponent } from './hubstock/hubstock.component';
import { EwaybillComponent } from './ewaybill/ewaybill.component';
import { TransferrequestComponent } from './transferrequest/transferrequest.component';
import { AcceptstockComponent } from './acceptstock/acceptstock.component';
import { VanroutelinkComponent } from './vanroutelink/vanroutelink.component';
import { EndtripComponent } from './endtrip/endtrip.component';
import { SettingsComponent } from './settings/settings.component';
import { OrderitemsComponent } from './orderitems/orderitems.component';
import { CustomersComponent } from './customers/customers.component';
import { SprhubstockComponent } from './sprhubstock/sprhubstock.component';
import { FactoryComponent } from './factory/factory.component';
import { CustomerordersComponent } from './customerorders/customerorders.component';
import { TripsComponent } from './trips/trips.component';
import { HubroutelinkComponent } from './hubroutelink/hubroutelink.component';
import { NewshopsComponent } from './newshops/newshops.component';
import { AdminnewshopsComponent } from './adminnewshops/adminnewshops.component';
import { HubewaybillComponent } from './hubewaybill/hubewaybill.component';
import { HubdashboardComponent } from './hubdashboard/hubdashboard.component';
import { RejectordersComponent } from './rejectorders/rejectorders.component';
import { AdminroutesComponent } from './adminroutes/adminroutes.component';
import { HubfactoryComponent } from './hubfactory/hubfactory.component';
import { AdmininvoiceComponent } from './admininvoice/admininvoice.component';
import { AdmininvoicereportComponent } from './admininvoicereport/admininvoicereport.component';

// Route Declaration

const routes: Routes = [
  { path: '', component: AdminloginComponent },
  { path: 'admin/dashboard/:id', component: AdmindashboardComponent },
  { path: 'hub/dashboard/:id', component: HubdashboardComponent },
  { path: 'sidebar', component: FreshsidebarComponent },
  { path: 'bankpayin/:id',component:CollectionComponent },
  { path: 'employee',component:EmployeeComponent },
  { path: 'order/place/:id',component:OrdersComponent },
  { path: 'invoice',component:InvoiceComponent },
  { path: 'products/:id',component:ProductsComponent },
  { path: 'van',component:VanComponent },
  { path: 'vanstock',component:VanstocksComponent },
  { path: 'preorder',component:PreodersComponent },
  { path: 'waybill',component:WaybillComponent },
  { path: 'hub/manage/:id',component:HubComponent },
  { path: 'fhub',component:FreshhubComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'hub/stock/:id', component: HubstockComponent },
  { path: 'spr/hub/stock/:id', component: SprhubstockComponent },
  { path: 'ewaybill/:id', component: EwaybillComponent },
  { path: 'hub/ewaybill/:id', component: HubewaybillComponent },
  { path: 'transfer/request/:id' , component : TransferrequestComponent },
  { path: 'acceptstock/:id', component: AcceptstockComponent },
  { path: 'rejectorders/:id', component: RejectordersComponent },
  { path: 'vanroutelink/:id', component: VanroutelinkComponent },
  { path: 'endtrip/:id', component: EndtripComponent },
  { path: 'settings/:id', component: SettingsComponent },
  { path: 'order/items/:id' , component: OrderitemsComponent },
  { path: 'customers/:id', component: CustomersComponent },
  { path: 'factory/:id', component: FactoryComponent },
  { path: 'customer/orders/:id', component: CustomerordersComponent },
  { path: 'trip/details/:id', component: TripsComponent },
  { path: 'hubroutelink/:id',  component: HubroutelinkComponent },
  { path: 'new/shops/:id', component: NewshopsComponent },
  { path: 'admin/new/shops/:id', component: AdminnewshopsComponent },
  { path: 'hub/routes/:id', component: HubroutesComponent },
  { path: 'admin/routes/:id', component: AdminroutesComponent },
  { path: 'hub/factory/:id', component: HubfactoryComponent },
  { path: 'invoices/:id', component: AdmininvoiceComponent },
  { path: 'invoices/report/:id', component: AdmininvoicereportComponent}
];


//Route import and export

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
