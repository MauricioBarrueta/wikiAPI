import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchModule } from './pages/search/search.module';
import { ArticleModule } from './pages/article/article.module';
// Se importa HttpClientModule para recurepar los datos de la API
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SearchModule,
        ArticleModule
    ]
})
export class AppModule { }
