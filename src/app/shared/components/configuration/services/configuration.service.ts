import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<any> {
    return this.http.get('/assets/config/app-local.json');
  }

  setConfig(config: any): void {
    this.config = config;
  }

  getConfig(): any {
    return this.config;
  }

  getServerHost(): string {
    return this.config?.server?.host;
  }
}