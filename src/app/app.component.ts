import { Component } from '@angular/core';
import { IOMDBResponse } from './omdbresponse';
import { OmdbApiService } from './services/omdb-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Movie Finder';
  movieData:IOMDBResponse | undefined;
  errorMessage:any;

  constructor(private _omdbService:OmdbApiService) {}

  getMovieDetails(movieName:string): void {
    this._omdbService.getMovieData(movieName).subscribe(
      movieData => {
        this.movieData = movieData;
        if (!this.movieData.Poster) {
          this.setDefaultPoster();
        }
      }
    );
  }

  setDefaultPoster() {
    if (this.movieData) {
          this.movieData.Poster = 'default-poster.jpg'; // set default image path
    }
  }
}
