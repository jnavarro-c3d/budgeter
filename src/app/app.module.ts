import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import { BudgetComponent } from './budget/budget.component';
import {CategoryService} from './services/category.service';
import {FormsModule} from '@angular/forms';
import { InputAutofocusDirective } from './directives/input-autofocus.directive';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { BudgetCategoryCardComponent } from './budget/budget-category-card/budget-category-card.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BudgetComponent,
    InputAutofocusDirective,
    BudgetCategoryCardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
