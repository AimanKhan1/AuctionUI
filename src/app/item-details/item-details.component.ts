import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription, interval } from 'rxjs';
import {AppSettings} from '../AppSettings';



@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

    private subscription: any;
  
    public dateNow = new Date();
    public dDay: any; //new Date('Jan 01 2021 00:00:00');
    milliSecondsInASecond = 1000;
    hoursInADay = 24;
    minutesInAnHour = 60;
    SecondsInAMinute  = 60;

    public timeDifference : any;
    public secondsToDday : any;
    public minutesToDday : any;
    public hoursToDday : any;
    public daysToDday : any;

    public showError : boolean = false;
    public bidAmount : number = 0;
    public errorMsg : string = "";
    public isAutoBidding : boolean = false;

  constructor(private _Activatedroute: ActivatedRoute,
    private _router:Router,
    private _itemService:ItemService,
    private _domSanitizer: DomSanitizer) { }

  sub: any;
  id: number = 0;
  item: any;
  itemHistory: any = [];

  ngOnInit(): void {
    AppSettings.getUser();
    this.sub= this._Activatedroute.paramMap.subscribe(params => {
       let bidId = params.get('id'); 
       this.id = bidId != null ? +bidId : 0;
       this.getItemDetails(this.id);
      
   });

  }
  
  private getTimeDifference () {
    this.timeDifference = this.dDay.getTime() - new  Date().getTime(); //this.dDay.getTime() - new  Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
}

  private allocateTimeUnits (timeDifference:any) {
      this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
      this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
      this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
      this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }


  getItemDetails(id: number): void {
    this._itemService.getItem(id).subscribe((data: any) => {
      let res = data;
      if (res != null) {
        res.image = this._domSanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${res.image}`);
        this.item = res;
        this.dDay = new Date(this.item.endTime);

        this.getBiddingHistory(id);
        this.subscription = interval(1000)
          .subscribe(x => { this.getTimeDifference(); });

        this.isAutoBidding = this.item.isAutoBidding;
        console.log(this.item);
      }

    });
  }

  getBiddingHistory(id: number): void {
    this._itemService.getBiddingHistory(id).subscribe((data: any)=>
    {
      let res = data;
      if(res != null){
        this.itemHistory = res;
      }
    });
  }

  bidNow() {
    this.showError = false;
    let currentUserId = AppSettings.UserId;

    if(this.bidAmount <= 0){
      alert('Please enter bid amount!');
      return;
    }

    if(this.bidAmount <= this.item.currentPrice){
      this.showError = true;
      this.errorMsg = "Bid amount should be greater than Item Current Price";
      return;
    }
    let postData = {
      itemBiddingId : this.id,
      userId : currentUserId,
      bidPrice : +this.bidAmount,
      isAutoBidding: this.isAutoBidding,
    } 
    this._itemService.bidItem(postData).subscribe((data: any)=>
    {
      debugger
      if(data){
        this.bidAmount = 0;
        //this.isAutoBidding = false;
        alert("Success: Bidding Done!");
      }
      else{
        alert("Error: Faild to Bid!");
      }
      
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subscription.unsubscribe();
  }
  
  onBack(): void {
     this._router.navigate(['items-list']);
  }

}
