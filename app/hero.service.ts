import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

// Unfortunately, the Angular Observable doesn't have a toPromise operator ... not out of the box. The Angular Observable is a bare-bones implementation.

// There are scores of operators like toPromise that extend Observable with useful capabilities. If we want those capabilities, we have to add the operators ourselves. That's as easy as importing them from the RxJS library like this:

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
// import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService{
  //
  // Attributes
  //

  private heroesUrl = 'app/heroes'; //URL to web API
  private headers = new Headers({'Content-Type': 'application/json'});

  //
  // Methods
  //
  constructor(
    private http: Http
   ){}

  getHeroes(): Promise<Hero[]> {
    //return Promise.resolve(HEROES); // NOTE: this is an old implementation when we were using mockdata
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(reponse => reponse.json().data as Hero[])
      .catch(this.handleError);
  }

  // Simulate a delay!!!
  // getHeroesSlowly(): Promise<Hero[]> {
  //   return new Promise<Hero[]>(resolve =>
  //     setTimeout(resolve, 2000)) // delay 2 seconds
  //     .then(() => this.getHeroes());
  // }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), { headers: this.headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), { headers: this.headers })
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  //
  // private
  //

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}