import { Component, OnInit, HostListener } from '@angular/core';
import { ItemService } from '../item.service';
import { DomSanitizer } from '@angular/platform-browser';
import {AppSettings} from '../AppSettings';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  constructor(private itemService: ItemService, private domSanitizer: DomSanitizer) { }
  items : any[] = [];

  filter : any = {
    itemName : "",
    description : "",
    take : 10,
    skip : 0,
    order: false
  };

  ngOnInit(): void {
    AppSettings.getUser();
    this.getItemsList();
  }

  hasMoreItems = false;
  showLoader = false;

  getItemsList(): void{

    this.itemService.getAllItems(this.filter).subscribe((data: any)=>
    {
      this.hasMoreItems = false;
      let res = data;
      res.forEach((element :any) => {
        element.image = this.domSanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${element.image}`);
      });
      if(this.showLoader){
        this.items = this.items.concat(res);
      }
      else{
        this.items = res;
      }

      let anyItem = this.items[0];
      if(anyItem != null && anyItem.count > this.items.length){
        this.hasMoreItems = true;
      }
      this.showLoader = false;

    });  
  }

  changeGender(e:any) {
    this.filter.order = e.target.value == 'true';
  }

  onClear(){
    this.filter = {
      itemName : "",
      description : "",
      take : 10,
      skip : 0,
      order: false
    };
    this.getItemsList();
  }

  onLoadMore(){
    this.showLoader = true;
    this.filter.take = 10;
    this.filter.skip += this.items.length;
    this.getItemsList();
  }

}
