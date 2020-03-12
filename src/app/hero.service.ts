import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service'
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
	
  constructor(
	private http: HttpClient,
	private messageService: MessageService,
	) { }

private heroesUrl = 'api/heroes';  // URL to web api

  getHero(id: number): Observable<Hero>{
	// TDOD: send the message _AFTER_ fetching the hero
	this.messageService.add(`HeroService: fetched the hero id=${id}`);
	return of(HEROES.find(hero => hero.id === id));
  }
	/** GET heroes from the server */
	getHeroes (): Observable<Hero[]> {
	return this.http.get<Hero[]>(this.heroesUrl)
	.pipe(
		catchError(this.handleError<Hero[]>('getHeroes', []))
	  );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
	return (error: any): Observable<T> => {
  
	  // TODO: send the error to remote logging infrastructure
	  console.error(error); // log to console instead
  
	  // TODO: better job of transforming error for user consumption
	  this.log(`${operation} failed: ${error.message}`);
  
	  // Let the app keep running by returning an empty result.
	  return of(result as T);
	};
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
