import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iPharm } from './iPharm';
import { iRec } from './iRec';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReceitaService {
  public isAdmin: any;
  constructor(private HttpClient: HttpClient) {}

  public obterPharm() {
    return this.HttpClient.get<iPharm>(
      `${environment.apiurl}api/Farmacias/obterByFarmaId/${environment.cnpj}`
    ).toPromise();
  }

  public obterRecs() {
    return this.HttpClient.get<iRec[]>(
      `${environment.apiurl}api/Farmacias/obterTodosRec`
    ).toPromise();
  }

  public obterRecsByName(nome: any) {
    return this.HttpClient.get<iRec[]>(
      `${environment.apiurl}api/Farmacias/obterRecByNome/${nome}`
    ).toPromise();
  }

  public obterRecById(id: any) {
    return this.HttpClient.get<iRec>(
      `${environment.apiurl}api/Farmacias/obterRecById/${id}`
    ).toPromise();
  }

  public insertReceita(receita: iRec) {
    return this.HttpClient.post<iRec>(
      `${environment.apiurl}api/Farmacias/adicionar`,
      receita
    ).toPromise();
  }
}
