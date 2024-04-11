import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DescriptionModel } from '../../../../../shared/models/response/description.model';
import { DescriptionRequestModel } from '../../../../../shared/models/request/description.request.model';
import { ConfigService } from '../../../../../shared/components/configuration/services/configuration.service';
import { DescriptionAdapter } from '../../../../../shared/model-adapter/description.adapter';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DescriptionServiceRepository {

  private host: string;
  private baseUrl = 'description/v1';

  constructor(
    private http: HttpClient, 
    private configService: ConfigService, 
    private descriptionAdapter: DescriptionAdapter) {
    this.host = this.configService.getServerHost();
   }

  getDescriptions(): Observable<DescriptionModel[]> {
    return this.http.get(`${this.host + this.baseUrl}`, httpOptions).pipe(
      map((data: any) => data.map((item: any) => this.descriptionAdapter.adapt(item)))
    );
  }

  createDescription(description: DescriptionRequestModel): Observable<void> {
    return this.http.post<void>(`${this.host + this.baseUrl}`, description, httpOptions);
  }

  updateDescription(descriptionId: number, description: DescriptionRequestModel): Observable<void> {
    return this.http.put<void>(`${this.host + this.baseUrl}/id/${descriptionId}`, description, httpOptions);
  }

  deleteDescription(descriptionId: number): Observable<void> {
    return this.http.delete<void>(`${this.host + this.baseUrl}/id/${descriptionId}`, httpOptions);
  }
}
