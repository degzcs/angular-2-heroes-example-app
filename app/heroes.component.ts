import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css'],
})

export class HeroesComponent implements OnInit {
  //
  // Attributes
  //
  heroes: Hero[] =[]; // NOTE: this variable is setting up in a promise in getHeroes method
  selectedHero: Hero;

  //
  //  Lifecycle Hook
  //

  ngOnInit(): void {
    this.getHeroes();
  }

  //
  // Methods
  //

  constructor(
    private router: Router,
    private heroService: HeroService
  ){}

  getHeroes(): void{
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void{
    this.router.navigate(['/heroes', this.selectedHero.id])
  }

  add(name: string): void {
    name = name.trim();
    if(!name){ return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delete(selectedHero: Hero): void {
    this.heroService.delete(selectedHero.id)
      .then(() => {
        this.heroes = this.heroes.filter( hero => hero !== selectedHero);
        if ( this.selectedHero === selectedHero) { this.selectedHero = null; }
      });
  }
}
