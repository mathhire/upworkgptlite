import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../material.module';
@Component({
  selector: 'app-response-content',
  templateUrl: './response-content.component.html',
  styleUrls: ['./response-content.component.css']
})
export class ResponseContentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}


  copy() {
    const str: any = document.getElementById('copyTarget')?.innerText;
    navigator.clipboard.writeText(str).then(() => {
      alert('Proposal Copied to Clipboard');
    }).catch(err => {
      console.log('error text not copied)')
    })
  }
}
