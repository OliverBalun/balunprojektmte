import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Navigation } from 'selenium-webdriver';
import { StahnisportService } from '../service/stahnisport.service';
import { StahnitymprogramService } from '../service/stahnitymprogram.service';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
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
  private stahniSportResult:any;
  Calendar:any;
  private loading:any= this.loadingController.create({
    message: 'Čekám na získání rozpisu...',
  });

  constructor(private stahnisportService: StahnisportService,private stahnitymprogramService: StahnitymprogramService,
    public loadingController: LoadingController,private router:Router,private route:ActivatedRoute,private storage: Storage,
    public alertController:AlertController, public platform:Platform) { 
    this.route.queryParams.subscribe(params=>{
      if (this.router.getCurrentNavigation().extras.state){
        this.ideligy=this.router.getCurrentNavigation().extras.state.user;
      }
    });
  }

  async presentAlert(idzapas:any,dateev:any,timeev:any,nameev:any) {
    const alert = await this.alertController.create({
      header: nameev,
      subHeader: timeev,
      message: dateev,
      buttons: [
        {
          text: 'Add event',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Ted zapis do kalendare');
            this.onZapasClick(idzapas,dateev,timeev,nameev);
          }
        }, {
          text: 'OK',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    console.log(idzapas,dateev,timeev,nameev); 
    await alert.present();
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

    //PRIDEJ UDALOST DO KALENDARE V ZARIZENI
    var startDate = new Date(2019,2,15,18,30,0,0); // beware: month 0 = january, 11 = december
    var endDate = new Date(2019,2,15,19,30,0,0);
    var title = "My nice event";
    var eventLocation = "Home";
    var notes = "Some notes about this event.";
    var success = function(message) { alert("Success: " + JSON.stringify(message)); };
    var error = function(message) { alert("Error: " + message); };
    var options = window.plugins.calendar.getCalendarOptions();
    console.log("tady");
    console.log(options);
    window.plugins.calendar.listCalendars(function(res1) {
    options.calendarId = res1[0].id;
    this.platform.ready().then(() => {
      //this.calendar.createEvent(title,eventLocation,notes,startDate,endDate); 
        window.plugins.calendar.createEvent(title,eventLocation,notes,startDate,endDate,success,error); 
    });
    //window.plugins.calendar.createEventWithOptions(title, loc, notes, start, end, options, success, error);
    }, function(res1) {
    alert('error : ' + res1);
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

  onInfoClick(idzapas:any,dateev:any,timeev:any,nameev:any){
    console.log('posilam info o zapasu');    
    console.log(idzapas,dateev,timeev,nameev);  
    console.log('vypisuju vsechny zapasy');      
    console.log(this.stahniSportResult);


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
