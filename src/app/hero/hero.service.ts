import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

/*
Deixei a publicKey/timestamp/hash de uma forma simples
Poderia implementar um método de geração de hash MD5 e tabém de captura de timestamp, mas acho que talvez não venha ao caso para o propósito da aplicação.
*/

export class HeroService {

    constructor(private http: HttpClient) { }

    public getHero(offset : number, name : string) {
        return this.http.get(environment.API + 'v1/public/characters?apikey=' + environment.publicKey + '&ts=' + environment.timestamp + '&hash=' + environment.hash + '&limit=10&offset='+ offset + (name != null && name != '' ? '&name='+name : ''));
    }

    public getHeroById(id: number) {
        return this.http.get(environment.API + 'v1/public/characters/'+ id +'?apikey=' + environment.publicKey + '&ts=' + environment.timestamp + '&hash=' + environment.hash);
    }

}
