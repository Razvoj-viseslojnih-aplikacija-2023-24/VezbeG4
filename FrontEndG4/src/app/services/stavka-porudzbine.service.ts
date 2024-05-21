import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StavkaPorudzbine } from '../models/stavka-porudzbine';
import { STAVKA_PORUDZBINE_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class StavkaPorudzbineService {

  constructor(private httpClient: HttpClient) { }

  public getAllStavkaPorudzbines():Observable<any> {
    return this.httpClient.get(`${STAVKA_PORUDZBINE_URL}`);
  }

  public getStavkeByPorudzbina(porudzbinaId:number):Observable<any>{
    return this.httpClient.get(`${STAVKA_PORUDZBINE_URL}/porudzbina/${porudzbinaId}`);
  }

  public addStavkaPorudzbine(stavkaPorudzbine:StavkaPorudzbine):Observable<any>{
    return this.httpClient.post(`${STAVKA_PORUDZBINE_URL}`, stavkaPorudzbine);
  }

  public updateStavkaPorudzbine(stavkaPorudzbine:StavkaPorudzbine):Observable<any>{
    return this.httpClient.put(`${STAVKA_PORUDZBINE_URL}/id/${stavkaPorudzbine.id}`, stavkaPorudzbine);
  }

  public deleteStavkaPorudzbine(stavkaPorudzbineId:number):Observable<any>{
    return this.httpClient.delete(`${STAVKA_PORUDZBINE_URL}/id/${stavkaPorudzbineId}`, {responseType:"text"});
  }
}
