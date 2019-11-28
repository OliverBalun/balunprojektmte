import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Navigation } from 'selenium-webdriver';
import { StahnisportService } from '../service/stahnisport.service';
import { StahnitymprogramService } from '../service/stahnitymprogram.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

interface zapasInterface {
  id : String
  date : String,
  time : String,
  name : String
}

interface zapasyInterface {
  zapasy : Array<zapasInterface>  
}

@Component({
  selector: 'app-ligazapasy',
  templateUrl: './ligazapasy.page.html',
  styleUrls: ['./ligazapasy.page.scss'],
})
export class LigazapasyPage implements OnInit {
  ideligy:any;
  public polezapasu: zapasyInterface = { zapasy : [] } ;
  private stahniSportResult:any
  private loading:any= this.loadingController.create({
    message: 'Čekám na získání rozvrhu...',
  });

  constructor(private stahnisportService: StahnisportService,private stahnitymprogramService: StahnitymprogramService,
    public loadingController: LoadingController,private router:Router,private route:ActivatedRoute,private storage: Storage) { 
    this.route.queryParams.subscribe(params=>{
      if (this.router.getCurrentNavigation().extras.state){
        this.ideligy=this.router.getCurrentNavigation().extras.state.user;
      }
    });
  }

  ngOnInit() {
    console.log("proklik");
    console.log(this.ideligy);

    //inicializace historie - bud nactu z local, nebo necham prazdne
    //this.presentLoading();
    this.storage.get('idzapasu').then((res:zapasyInterface) => {

      if (res) {        
        this.polezapasu.zapasy=res.zapasy;  
       // this.loading.dismiss();

      }else{
        this.polezapasu = { zapasy : [] } ;
      //  this.loading.dismiss();
      }
     // this.loading.dismiss();
    }); 

    //nacteni/zapis ligy
    if(this.ideligy){
      //tak ho zapis do db
      this.storage.set('idligy',this.ideligy);
      if (this.ideligy.length<5){
        this.loadDataLigy();
      }else{
        this.stahniSportResult=this.ideligy["events"];
      }
    }else{
      //vytahni si posledni z db, kdyz neni tak se vrat na home
     // this.presentLoading();
     //this.router.navigate(['home']);
      this.storage.get('idligy').then((res) => {

        if (res) {        
          this.ideligy=res;  
          if (this.ideligy.length<5){
            this.loadDataLigy();
          }else{
            this.stahniSportResult=this.ideligy["events"];
          }
  
        }else{
          this.router.navigate(['home']);
        }
        //this.loading.dismiss();
      });
    }


    
  
  }

  onZapasClick(idzapas:any,dateev:any,timeev:any,nameev:any){
    this.presentLoading();
    console.log('posilam id zapasu');    
    console.log(idzapas,dateev,timeev,nameev);  
    console.log('vypisuju pred readem');      
    console.log(this.polezapasu);
    this.storage.get('idzapasu').then((res:zapasyInterface) => {
      //console.log('Your age is', val);
      //this.polezapasu=(val);
      if (res) {        

        this.polezapasu.zapasy=res.zapasy;  
        console.log('vypisuju pole po readu');      
        console.log(this.polezapasu);
        this.polezapasu.zapasy.push({id : idzapas, date: dateev, time: timeev, name: nameev})  
        console.log('vypisuju pole po pushi');
        console.log(this.polezapasu); 
        //this.storage.set('idzapasu', this.polezapasu);
        this.storage.set('idzapasu',this.polezapasu).then(res => {
          console.log('zapas added true');
        })
        console.log('vypisuju po vykonani buttonu true');      
        console.log(this.polezapasu);
        this.loading.dismiss();

      }else{
        let zapas_obj : zapasyInterface = { zapasy : [{id : idzapas, date: dateev, time: timeev, name: nameev}] }
        this.storage.set('idzapasu',zapas_obj).then(res => {
          console.log('zapas added else');
        })
        console.log('vypisuju po vykonani buttonu else');      
        console.log(this.polezapasu);
        this.loading.dismiss();
      }
      this.loading.dismiss();
    }); 


    /*this.polezapasu.push(idzapas);
    console.log('vypisuju pole po pushi');
    console.log(this.polezapasu); 
    this.storage.set('idzapasu', (this.polezapasu)); */
     /* //console.log(this.teamID);
      let navigationExtras:NavigationExtras= {
        state:{
          user: idzapas
        }
      };
      this.router.navigate(['ligazapasy'], navigationExtras);*/
  }

  loadDataLigy(){
    console.log(this.ideligy);
    {
      this.presentLoading(); //zavolam loader pro zobrazeni nacitani
      //debugger; zastavi mi v kodu behem chodu stranky
      //zavolat API
      this.stahnisportService.getLigaEvents(this.ideligy).subscribe( (response) => {
        //response from server is back, jdeme zpracovat odpoved
        console.log(response);
        this.stahniSportResult=response["events"];
        //hide loading dialog
        //this.teamID=response["teams"]["0"]["idTeam"];
        console.log(response["events"]);
        this.loading.dismiss();
      } );

  
      
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Čekám na získání rozpisu...',
    });
    await this.loading.present();
  }

}
