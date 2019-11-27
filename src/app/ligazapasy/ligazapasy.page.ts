import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Navigation } from 'selenium-webdriver';
import { StahnisportService } from '../service/stahnisport.service';
import { StahnitymprogramService } from '../service/stahnitymprogram.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-ligazapasy',
  templateUrl: './ligazapasy.page.html',
  styleUrls: ['./ligazapasy.page.scss'],
})
export class LigazapasyPage implements OnInit {
  ideligy:any;
  private stahniSportResult:any
  private loading:any= this.loadingController.create({
    message: 'Čekám na získání rozvrhu...',
  });

  constructor(private stahnisportService: StahnisportService,private stahnitymprogramService: StahnitymprogramService,
    public loadingController: LoadingController,private router:Router,private route:ActivatedRoute) { 
    this.route.queryParams.subscribe(params=>{
      if (this.router.getCurrentNavigation().extras.state){
        this.ideligy=this.router.getCurrentNavigation().extras.state.user;
      }
    })
  }

  ngOnInit() {
    console.log("proklik");
    console.log(this.ideligy);
    if (this.ideligy.length<5){
    this.loadDataLigy();
    }else{
      this.stahniSportResult=this.ideligy["events"];
    }
  }

  onZapasClick(idzapas:any){
    console.log('posilam id zapasu');    
    console.log(idzapas);    
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
