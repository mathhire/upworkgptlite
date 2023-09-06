import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card'
import {MatDividerModule} from '@angular/material/divider'
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatFormFieldModule} from '@angular/material/form-field';

// add more material components as you need

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatProgressBarModule,
    MatFormFieldModule

    // add more material components here
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatSidenavModule,
    MatDividerModule,
    MatProgressBarModule,
    MatFormFieldModule
    // add more material components here
  ],
})
export class MaterialModule {}
