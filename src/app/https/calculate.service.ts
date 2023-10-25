import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CalculateService {
  private URL: string = environment.API;
  private SUB: string = 'calculate';
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(`${this.URL}/${this.SUB}`);
  }
  group(): Observable<any> {
    return this.http.get(`${this.URL}/${this.SUB}/group`);
  }
  noGroup(): Observable<any> {
    return this.http.get(`${this.URL}/${this.SUB}/noGroup`);
  }
  calculate(): Observable<any> {
    return this.http.get(`${this.URL}/${this.SUB}/calculate`);
  }
}
