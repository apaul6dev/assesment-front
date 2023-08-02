import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { HOST, HTTP_OPTIONS } from '../shared/constants';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductService {

    productsChange = new Subject<Product[]>();
    msgChange = new Subject<string>();

    url = `${HOST}/products`;
    httpOptions = HTTP_OPTIONS

    constructor(private http: HttpClient) { }

    getProducts() {
        return this.http.get<Product[]>(`${this.url}`);
    }

    save(data: Product) {
        return this.http.post(`${this.url}/save`, data);
    }

    update(data: Product) {
        return this.http.put(`${this.url}/update/${data.id}`, data);
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/delete/${id}`);
    }

}
