import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, pluck } from "rxjs";
import { environment } from "src/environments/environment";

/**
 *! Las interfaces se crearon para dar un 'formato' a la respuesta que se recibe de la petición
 ** Por defecto la API de Wikipedia devuelve 2 propiedades innecesarias para esta práctica ("batchcomplete" y "continue")
 ** - apiResponse es la encargada de dar el formato de la respuesta final, devuelve un array[] y trae como objeto la propiedad search, que es
 **     se encuentra toda la información necesaria.
 ** - article es donde se definen todas las propiedades del objeto, que posteriormente las recibe 'apiResponse' */
interface apiResponse {
    query: {
        search: article[]
    }
}
/* Para facilitar esto se puede copiar Objeto desde la consola y convertirlo a interface con la página (https://transform.tools/json-to-typescript) */
export interface article {
    ns: number
    title: string
    pageid: number
    size: number
    wordcount: number
    snippet: string
    timestamp: string
}

/* Se Injecta httpClient para poder conectarse a la API */ 
@Injectable({providedIn: 'root'})
export class SearchService {
    constructor(private readonly http: HttpClient) { }
    
    /* Método que devuelve un array del tipo article, en este caso del contenido */
    search(srsearch: string): Observable<article[]> {
        // srsearch = Lo que el usuario está buscando y origin: Para evitar un error
        const params = {
            action: 'query',
            format: 'json',
            list: 'search',
            srsearch: srsearch,
            utf8: '1',
            origin: '*'
        }
        /* Devuelve el array 'apiResponse' para posteriormente extraer sus propiedades con pluck() */
        return this.http.get<apiResponse>(environment.api, { params })
            .pipe(pluck('query', 'search')); /* pluck(): Extrae las propiedades del objeto 'apiResponse' */
    }
}