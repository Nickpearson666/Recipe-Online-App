import {Component, EventEmitter, Output} from "@angular/core";
import {DataStorageService} from "../shared/data.storage.service";

@Component({
  selector:"app-header",
  templateUrl: "./header.component.html"
  }
)
export  class HeaderComponent{
  @Output()
  clickHandler = new EventEmitter<String>();

  constructor(private dataStoreService: DataStorageService) {
  }

OnClickHandler(evenType:string){
  this.clickHandler.emit(evenType);
}

  onSaveData(){
  this.dataStoreService.storeRecipes();
  }

  onFetchData(){
    this.dataStoreService.fetchRecipes().subscribe();
  }


}
