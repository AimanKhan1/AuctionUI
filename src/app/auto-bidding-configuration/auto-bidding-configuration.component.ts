import { Component, OnInit } from '@angular/core';
import {AppSettings} from '../AppSettings';
import { ItemService } from '../item.service';


@Component({
  selector: 'app-auto-bidding-configuration',
  templateUrl: './auto-bidding-configuration.component.html',
  styleUrls: ['./auto-bidding-configuration.component.css']
})
export class AutoBiddingConfigurationComponent implements OnInit {

  constructor(private itemService: ItemService) { }
  userId = 0;
  configAmount: any;
  ngOnInit(): void {
    AppSettings.getUser();
    this.userId = AppSettings.UserId;
    this.itemService.getBidConfiguration(this.userId).subscribe((data: any) => {
      this.configAmount = data;
    });
  }

  onSave(){
    if(this.configAmount < 0){
      alert("Please enter above 0 amount.");
      return;
    }
    let reqData = {
      userId : this.userId,
      maxBidAmount : +this.configAmount,
    }

    this.itemService.saveBidConfiguration(reqData).subscribe((data: any)=>
    {
      if(data){
        alert("Success: Configuration Saved!");
      }
      else{
        alert("Error: Faild to save configuration!");
      }
    });  

  }


}
