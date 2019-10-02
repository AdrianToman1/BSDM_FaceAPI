import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ApiOutputComponent } from './api-output/api-output.component';
import { FaceIndexComponent } from './face-index/face-index.component';
import { FaceMatchComponent } from './face-match/face-match.component';
import { AzureDetectComponent } from './azure-detect/azure-detect.component';
import { AzureTrainComponent } from './azure-train/azure-train.component';
import { AzureVerifyComponent } from './azure-verify/azure-verify.component';

import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { PrettyPrintPipe } from "./azure-detect/pretty-print.pipe";

import { AzureFaceRecognitionService } from "./services/azure-face-recognition.service";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ApiOutputComponent,
    FaceIndexComponent,
    FaceMatchComponent,
    AzureDetectComponent,
    AzureTrainComponent,
    AzureVerifyComponent,

    PrettyPrintPipe,

    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'api-output', component: ApiOutputComponent },
      { path: 'face-match', component: FaceMatchComponent },
      { path: 'face-index', component: FaceIndexComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [
    AzureFaceRecognitionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
