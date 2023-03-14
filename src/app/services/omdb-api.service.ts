import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IOMDBResponse } from '../omdbresponse';

@Injectable({
  providedIn: 'root'
})
export class OmdbApiService {
  private _siteURL = "http://www.omdbapi.com/";
  private _key = "?apikey=a5a7a321&t=";

  constructor(private _http: HttpClient) {}

  getMovieData(movieName: string): Observable<IOMDBResponse> {
    return this._http
      .get<IOMDBResponse>(this._siteURL + this._key + movieName)
      .pipe(
        tap(data => console.log('Movie data:', data)),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    console.log('OmdbApiService:', err.message);
    return throwError(new Error('OmdbApiService:' + err.message));
  }
}
