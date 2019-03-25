import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IImage } from '../models/IImage';



@Injectable()
export class DataService {
  apiUrl: string = 'https://jsonplaceholder.typicode.com';


  constructor(private httpClient: HttpClient) { }


  /**
   * Retrieves a list of image objects
   */
  public getImages(): Observable<IImage[]> {
    return this.httpClient.get<IImage[]>(`${this.apiUrl}/albums/1/photos?_limit=10`);
  }
}
