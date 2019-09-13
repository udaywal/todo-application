import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { LandingModule } from './landing/landing.module';
import { MiscModule } from './misc/misc.module';
import { TodoModule } from './todo/todo.module';

import { MainService } from './main.service';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './misc/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './misc/server-error/server-error.component';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { SignupComponent } from './landing/signup/signup.component';
import { LoginComponent } from './landing/login/login.component';
import { ForgotPasswordComponent } from './misc/forgot-password/forgot-password.component';
import { DashboardComponent } from './todo/dashboard/dashboard.component';
import { ResetPasswordComponent } from './misc/reset-password/reset-password.component';
import { TasksComponent } from './todo/tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LandingModule,
    MiscModule,
    TodoModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      //{ path: '', component: LandingPageComponent },
      { path: '', component: SignupComponent },
      { path: 'signup', component: SignupComponent},
      { path: 'login', component: LoginComponent},
      { path: 'dashboard', component: DashboardComponent},
      { path: 'tasks/:taskId', component: TasksComponent},
      { path: 'forgotpassword', component: ForgotPasswordComponent},
      { path: 'resetpassword/:userId', component: ResetPasswordComponent},
      { path: '500', component: ServerErrorComponent},
      { path: '404', component: PageNotFoundComponent},
      { path: '*', redirectTo: '404'},
      { path: '**', redirectTo: '404'}
    ])
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})


export class AppModule { }
