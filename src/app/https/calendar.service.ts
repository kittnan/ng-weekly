import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CalendarService {


  private URL: string = environment.API
  private SUB: string = "calendar"
  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    return this.http.post(`${this.URL}/${this.SUB}/create`,data)
  }
  get(): Observable<any> {
    return this.http.get(`${this.URL}/${this.SUB}`)
  }
  download(): Observable<any> {
    return this.http.get(`${this.URL}/${this.SUB}/download`)
  }
}
