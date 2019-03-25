import { Component, Input } from '@angular/core';

import { IImage } from '../models/IImage';



@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent {
  @Input() model: IImage;

  loading: boolean = true;


  constructor() { }


  /**
   * Changes status on image load
   */
  onLoad(): void {
    this.loading = false;
  }

}
