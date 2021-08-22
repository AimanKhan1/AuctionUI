import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private REST_API_SERVER = "https://localhost:44304";

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public getAllItems(filter:any){
    let url = this.REST_API_SERVER +"/GetItems";
    return this.httpClient.post(url, filter, this.httpOptions);
  }

  public getItem(bidId : number){
    let url = this.REST_API_SERVER +"/GetItemById?itemBiddingId="+bidId;
    return this.httpClient.get(url, this.httpOptions);
  }

  public getBiddingHistory(bidId : number){
    let url = this.REST_API_SERVER +"/GetItemBiddingHistory?itemBiddingId="+bidId;
    return this.httpClient.get(url, this.httpOptions);
  }

  public bidItem(data: any){
    let url = this.REST_API_SERVER +"/BidNow";
    return this.httpClient.post(url, data, this.httpOptions);
  }

  public getBidConfiguration(userId : number){
    let url = this.REST_API_SERVER +"/GetAutoBidAmount?userId="+userId;
    return this.httpClient.get(url, this.httpOptions);
  }

  public saveBidConfiguration(data: any){
    let url = this.REST_API_SERVER + '/SaveAutoBidAmount';
    return this.httpClient.post(url, data, this.httpOptions);
  }

}
