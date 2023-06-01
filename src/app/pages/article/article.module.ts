import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';

/* Se exporta para poder ser utilizado */
@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ArticleComponent
  ]
})
export class ArticleModule { }
