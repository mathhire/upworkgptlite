import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loading-service',
  templateUrl: './loading-service.component.html',
  styleUrls: ['./loading-service.component.css']
})

export class LoadingServiceComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {


      console.log ('data isloading is ', data)

  }
  }
