import { Component, OnInit } from '@angular/core';
import { StahnisportService } from '../service/stahnisport.service';
import { StahnitymprogramService } from '../service/stahnitymprogram.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  //zde muzem definovat vlastnosti a properties
  private userInput:string=''
  private teamID:string=''
  private stahniSportResult:any
  private stahniTymprogramResult:any
  private loading:any= this.loadingController.create({
    message: 'Čekám na získání rozvrhu...',
  });

  private selectedItem: any;
  private icons = [
    'football'
  ];
  private ligy = [
    'Premier League',
    'Bundesliga',
    'Serie A',
    'French Ligue 1',
    'La Liga'
  ];
  private idsligy = [
    '4328',
    '4331',
    '4332',
    '4334',
    '4335'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private stahnisportService: StahnisportService,private stahnitymprogramService: StahnitymprogramService,
              public loadingController: LoadingController,) 
    {
    for (let i = 0; i < 5; i++) {
      this.items.push({
        title: this.ligy[i],
        note: 'This is liga id #' + this.idsligy[i],
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }

  btnSportClicked(){
    console.log(this.userInput);
    {
      this.presentLoading(); //zavolam loader pro zobrazeni nacitani
      //debugger; zastavi mi v kodu behem chodu stranky
      //zavolat API
      this.stahnisportService.getSport(this.userInput).subscribe( (response) => {
        //response from server is back, jdeme zpracovat odpoved
        console.log(response);
        //this.stahniSportResult=response["teams"];
        //hide loading dialog
        this.teamID=response["teams"]["0"]["idTeam"];
        console.log(response["teams"]["0"]["idTeam"]);
        //this.loading.dismiss();
        this.stahnitymprogramService.getTymprogram(this.teamID).subscribe( (response) => {
          //response from server is back, jdeme zpracovat odpoved
          console.log(response);
          //this.stahniSportResult=response["teams"];
          //hide loading dialog
          //console.log(response["teams"]["0"]["idTeam"]);
          this.loading.dismiss();
        } );
      } );

      console.log('hotovo podle jmena');
      console.log(this.teamID);
      //zavlam apinu pro ziskany teamID
      //this.presentLoading(); //zavolam loader pro zobrazeni nacitani
      //debugger; zastavi mi v kodu behem chodu stranky
      //zavolat API
      /*this.stahnitymprogramService.getTymprogram(this.teamID).subscribe( (response) => {
        //response from server is back, jdeme zpracovat odpoved
        console.log(response);
        //this.stahniSportResult=response["teams"];
        //hide loading dialog
        //console.log(response["teams"]["0"]["idTeam"]);
        this.loading.dismiss();
      } );*/
      
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Čekám na získání rozpisu...',
    });
    await this.loading.present();
  }
}
