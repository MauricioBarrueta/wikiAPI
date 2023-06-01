import { Component } from '@angular/core';
import { SearchService, article } from './pages/search/service/search.service';
import { tap, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /* Se crea una variable de tipo Observable la cual contendrá los datos almacenados en la interface 'article' de search.component */
  article$!: Observable<article[]>;

  /* Se inyecta el service en el constructor para poder comunicarse con la API */
  constructor(private readonly searchService: SearchService) { }  

  /* Método que recibe el valor obtenido mediante el evento 'formSubmitted' del html y obtiene la respuesta de la API */
  onSearch(term: string): void {  
    /* Devuelve un Observable con un array de 'articles' */
    this.article$ = this.searchService.search(term);
  }
}