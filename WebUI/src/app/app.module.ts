import { AuthGuard } from './auth/auth-guard.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { HomepageComponent } from './page/homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterPageComponent } from './page/register-page/register-page.component';
import { NavigationBarComponent } from './layout/navigation-bar/navigation-bar.component';
import { RecommendationComponent } from './layout/recommendation/recommendation.component';
import { CardComponent } from './items/card/card.component';
import { ItemPageComponent } from './page/item-page/item-page.component';
import { CartPageComponent } from './page/cart-page/cart-page.component';
import { SellerPageComponent } from './page/seller-page/seller-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AddItemPageComponent } from './page/add-item-page/add-item-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomepageComponent,
    RegisterPageComponent,
    NavigationBarComponent,
    RecommendationComponent,
    CardComponent,
    ItemPageComponent,
    CartPageComponent,
    SellerPageComponent,
    AddItemPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {
          path: 'homepage',
          component: HomepageComponent,
          canActivate: [AuthGuard],
        },
        {
          path: 'seller',
          component: SellerPageComponent,
          canActivate: [AuthGuard],
        },
        {
          path: 'item',
          component: ItemPageComponent,
          canActivate: [AuthGuard],
        },
        {
          path: 'add-item',
          component: AddItemPageComponent,
          canActivate: [AuthGuard],
        },
        {
          path: 'cart',
          component: CartPageComponent,
          canActivate: [AuthGuard],
        },
        { path: 'login', component: LoginPageComponent },
        { path: 'register', component: RegisterPageComponent },
        { path: '**', component: LoginPageComponent, canActivate: [AuthGuard] },
      ],
      {
        useHash: true,
      }
    ),
    RouterModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
