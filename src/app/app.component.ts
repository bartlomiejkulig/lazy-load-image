import { Component, OnInit } from '@angular/core';

import { IImage } from './models/IImage';
import { DataService } from './services/data.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  model: IImage[];
  modelIsLoaded: boolean = false;


  constructor(public dataService: DataService) {}


  ngOnInit(): void {
    this.setInitialModel();
  }


  /**
   * Sets Initial data for component by fetching it thru data service
   */
  setInitialModel(): void {
    this.dataService.getImages().subscribe((data: IImage[]) => {
      this.model = data;
      this.modelIsLoaded = true;
    }, (err: Error) => {
      console.log('Unable to fetch data', err);
    });
  }
}
