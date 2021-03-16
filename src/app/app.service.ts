import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService{

  url = 'http://localhost:5000'

  constructor(private http: HttpClient) { }

  get(cidade = null) {
    cidade = (typeof cidade === 'string') ? '/'+cidade : '';
    return this.http.get(`${this.url}`+cidade);
  }
}
