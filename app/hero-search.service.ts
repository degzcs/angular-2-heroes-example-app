import { Injectable } from '@angular/core';
import { Http, Reponse } from '@angular/http';
import { Observable } from 'rxjs';

import { Hero } from './hero';

@Injectable()
export class HeroSearchService {

  //
  // Methods
  //

  constructor(
    private http: Http
  ){}

  search(term: string): Observable<Hero[]> {
    return this.http
      .get(`app/heroes/?name=${ term }`)
      .map((response: Response) => response.json().data as Hero[]);
  }
}