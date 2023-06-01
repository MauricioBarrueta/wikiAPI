import { Component, Input } from '@angular/core';
import { article } from '../search/service/search.service';

@Component({
  selector: 'app-article',
  template: `
    <article class="article">
      <a [href]="'https://es.wikipedia.org/?curid=' + article.pageid" target="_blank">{{article.title}}</a>
      <p [innerHTML]="article.snippet"></p>
    </article>
  `,
  styleUrls: ['./article.component.css']
})
export class ArticleComponent{
  /* !: Se coloca cuando no se está inicializando una variable */
  @Input() article!: article; // Se importa la interface 'article' del service de search
}

/**
 *! Decoradores y Operadores:
 ** @Input: Decorador que permite que el componente padre se pueda comunicar con el hijo
 ** [innerHTML]: Directiva que renderiza código HTML, en este caso la propiedad 'snippet' regresa un elemento <span>, que si no se renderiza
 **   lo toma como si la etiqueta fuera parte del texto que se obtiene de la API
 */