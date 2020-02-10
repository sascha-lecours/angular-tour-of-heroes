import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class HeroService {
	
  constructor(private messageService: MessageService) { }

  getHero(id: number): Observable<Hero>{
	// TDOD: send the message _AFTER_ fetching the hero
	this.messageService.add(`HeroService: fetched the hero id=${id}`);
	return of(HEROES.find(hero => hero.id === id));
  }
  getHeroes(): Observable<Hero[]> {
	// TDOD: send the message _AFTER_ fetching the heroes
	this.messageService.add('HeroService: fetched heroes');
	return of(HEROES);
  }
}
