import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { GenerateproposalComponent } from './generateproposal/generateproposal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingServiceComponent } from './loading-service/loading-service.component';
import { ResponseContentComponent } from './response-content/response-content.component';

@NgModule({
  declarations: [
    AppComponent,
    GenerateproposalComponent,
    LoadingServiceComponent,
    ResponseContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
