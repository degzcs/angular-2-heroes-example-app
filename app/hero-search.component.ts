import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';

@Component({
  moduleId: module.id,
  selector: 'hero-search',
  templateUrl: 'hero-search.component.html',
  styleUrls:['hero-search.component.css'],
  providers: [HeroSearchService]
})

export class HeroSearchComponent implements OnInit {

  //
  // Attributes
  //

  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  // Lifecycle Hooks

  ngOnInit():void{
    this.heroes = this.searchTerms
      .debounceTime(300) // Wait for 300ms pause in events
      .distinctUntilChanged() // Ignore if the next search term is same as previous
      .switchMap( term => term // Switch to new Observable each time
          // return the http search observable
          ? this.heroSearchService.search(term)
          // Or the observable of empty heroes if no search terms
          : Observable.of<Hero[]>([])
      )
      .catch( error => {
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }

  //
  // Methods
  //

  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router
  ){}

  // Push search terms into the Observable stream
  search(term: string): void{
    this.searchTerms.next(term);
  }

  gotoDetail(hero: Hero): void {
    let link = ['/heroes', hero.id];
    this.router.navigate(link);
  }
}