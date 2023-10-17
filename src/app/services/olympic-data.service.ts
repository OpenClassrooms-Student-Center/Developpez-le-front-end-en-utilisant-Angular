import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {OlympicData} from "../models/olympic-data.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataPath = 'assets/mock/olympic.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<OlympicData[]> {
    return this.http.get<OlympicData[]>(this.dataPath);
  }
}
