import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class StahnisportService {
  //url ='https://www.thesportsdb.com/api/v1/json/1/all_leagues.php';
  url = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=';//'https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=133602';
  //apiKey= 'afc737cadfmsh3263f43c966acb0p1fbd5ajsn1a853e75dc92';
  //apiHost= 'football6.p.rapidapi.com';
  

  constructor(private http: HttpClient) { }

  public getSport(userInput:string){
    //let headers = new HttpHeaders();
   // headers = headers.set('X-RapidAPI-Key', this.apiKey);
    //headers.append('X-RapidAPI-Host', this.apiHost);
    //console.log(headers);
    return this.http.get(this.url+userInput);//.map((res: Response) => res.json())
    //let url = url;
    //return this.http.head(url,).get(this.url).;//.header('X-RapidAPI-Key',this.apiKey);
  }
}
