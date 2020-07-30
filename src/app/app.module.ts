import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/components/header/header.component';
import { ListComponent } from './common/components/list/list.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './common/components/profile/profile.component';
import { GithubService } from './common/services/github.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './common/components/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    ProfileComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
