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

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomepageComponent,
    RegisterPageComponent,
    NavigationBarComponent,
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
        { path: 'login', component: LoginPageComponent },
        { path: 'register', component: RegisterPageComponent },
        { path: '**', component: LoginPageComponent, canActivate: [AuthGuard] },
      ],
      {
        useHash: true,
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
