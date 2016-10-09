import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  // moduleId: module.id, //TODO: research why this does not work here!!!
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  //
  // Attributes
  //

  heroes: Hero[] = [];

  //
  // Lifecycle Hooks
  //

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1,5));
  }

  //
  // Methods
  //

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  gotoDetail(hero: Hero): void {
    let link = ['/heroes', hero.id];
    this.router.navigate(link);
  }

}