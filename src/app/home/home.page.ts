import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private loadzdb:any
  private obrazekpath:any="homeimg.jpg";
  private vicjak4:boolean=false;
  constructor(storage:Storage) {
    storage.get('idzapasu').then((res) => {
      //console.log('Your age is', val);
      if(res){
        this.loadzdb=res.zapasy; 
        if (this.loadzdb.length>4) {this.vicjak4=true} else {this. vicjak4=false}; 
        console.log(this.vicjak4);
      }
    });
  }

}
