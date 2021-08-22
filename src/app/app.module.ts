import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { AutoBiddingConfigurationComponent } from './auto-bidding-configuration/auto-bidding-configuration.component';



@NgModule({
  declarations: [
    AppComponent,
    ItemsListComponent,
    LoginComponent,
    ItemDetailsComponent,
    AutoBiddingConfigurationComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'items-list', component: ItemsListComponent},
      {path: 'item-details/:id', component: ItemDetailsComponent},
      {path: 'configuration', component: AutoBiddingConfigurationComponent},
    ]),
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}


