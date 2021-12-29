import { AuthService } from './auth.service';

import { Injectable } from '@angular/core';
import { Produit } from '../Model/Produit';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
 // [x: string]: any;
  apiURL: string = 'http://localhost:8080/produits';

  static listeProduits(): Produit[] {

    throw new Error('Method not implemented.');
  }

  produits: Produit[]; //un tableau de Produit

  produit: Produit;

  constructor(private http: HttpClient,
    private authService: AuthService
  ) {
    /*this.produits = [
    { idProduit : 1, nomProduit : "PC Asus", prixProduit : 3000.600, dateCreation : new Date("01/14/2011")},
    { idProduit : 2, nomProduit : "Imprimante Epson", prixProduit : 450, dateCreation : new Date("12/17/2010")},
    { idProduit : 3, nomProduit :"Tablette Samsung", prixProduit : 900.123, dateCreation : new Date("02/20/2020")}
    ];*/
  }

  listeProduit(): Observable<Produit[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Produit[]>(this.apiURL+"/api",{headers:httpHeaders}
    );
    }


  ajouterProduit(prod: Produit): Observable<Produit> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Produit>(this.apiURL+"/api", prod, { headers: httpHeaders });
  }
  supprimerProduit(id: number) {
    const url = `${this.apiURL}/api/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });
  }

  consulterProduit(id: number): Observable<Produit> {
    const url = `${this.apiURL}/api/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Produit>(url,{headers:httpHeaders});
    }

  trierProduits() {
    this.produits = this.produits.sort((n1, n2) => {
      if (n1.idProduit > n2.idProduit) {
        return 1;
      }
      if (n1.idProduit < n2.idProduit) {
        return -1;
      }
      return 0;
    });
  }
  updateProduit(prod: Produit): Observable<Produit> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.put<Produit>(this.apiURL+"/api", prod, { headers: httpHeaders });
  }
}
