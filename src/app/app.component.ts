import { environment } from './../environments/environment.example';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) { }

  searchValue: string = '';
  gifs: Gif[] = [];
  apiKey = environment.apiKey;

  ngOnInit(): void {
    this.getGifs();
  }

  getGifs(): void {
    const request = this.http.get<GifResult>
      (`https://api.giphy.com/v1/gifs/trending?api_key=${this.apiKey}&limit=28&rating=g`);

    request.subscribe((result) => {

      console.log(result);
      this.gifs = result.data;
    });
  }

  searchGifs(): void {
    if (this.searchValue.trim().length === 0) {
      this.getGifs;
      return;
    }

    const request = this.http.get<GifResult>
      (`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${this.searchValue.trim()}&limit=28&offset=0&rating=g&lang=en`);

    request.subscribe((result) => (this.gifs = result.data));
  }

  onPressEnter(event: any) {
    if (event.keyCode === 13) {
      this.searchGifs();
    }
  }

  emptyState() {
    if (this.searchValue.length === 0) {
      this.getGifs();
    }
  }

}

interface GifResult {
  pagination: {
    count: number;
    offset: number;
    total_count: number;
  };
  data: Gif[];

}

interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      width: string;
      height: string;
      size: string;
      url: string;
    }
  };

}
