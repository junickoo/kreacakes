import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/environments/url-list';

@Injectable({
  providedIn: 'root',
})
export class RecommendationServiceService {
  constructor(private http: HttpClient) {}

  recommendationItems() {
    return this.http.get(ApiUrl.getRecommendation);
  }
}
