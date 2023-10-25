import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartHttpService {
  private URL: string = environment.API;
  private SUB: string = 'chart';
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(`${this.URL}/${this.SUB}/1`);
  }
  get2(): Observable<any> {
    return this.http.get(`${this.URL}/${this.SUB}/2`);
  }
}
