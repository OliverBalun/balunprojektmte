import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private loadzdb:any
  constructor(storage:Storage) {
    storage.get('idzapasu').then((res) => {
      //console.log('Your age is', val);
      if(res){
        this.loadzdb=res.zapasy;
      }
    });
  }

}
