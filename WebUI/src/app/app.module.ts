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
          path: 'item',
          component: ItemPageComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
