import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap, debounceTime, distinctUntilChanged, filter, map } from 'rxjs';

/**
 * ! Este componente su única función es obtener el valor ingresado en el Input y mandarlo al componente padre (app.component.ts) */
@Component({
  selector: 'app-search',
  // Se creó la estructura HTML usando 'template:' ya que no es mucho código y el archivo .html era innecesario
  template: `
    <div class="form">
      <form>        
        <div class="mb-3">
           <!-- formControl: Objeto que sirve para controlar el valor del input -->
          <input type="text" [formControl]="inputValue" class="form-control" placeholder="¿Qué deseas buscar?">
        </div>   
      </form>
    </div>
  `,
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  inputValue = new FormControl(''); /* Variable que almacena el valor del input, es un Observable */
  @Output() formSubmitted = new EventEmitter<string>();

  constructor() { }

  /* Se ejecuta el método que obtiene el valor del input al iniciar la aplicación */
  ngOnInit(): void { this.onChange(); }

  /* Método que obtiene el valor del Input para posteriormente mandarlo a app.component */
  onChange(): void {   
    /* valueChanges: Obtiene el valor del input automáticamente, es decir, se actualiza cada que el usuario presiona una tecla */     
    this.inputValue.valueChanges   
    /* De esta forma se evita que se haga una petición por cada caractér que introduzca el usuario */ 
      .pipe(
        map((search) => search?.toString().trim()),
        debounceTime(350),
        distinctUntilChanged(),
        filter((search) => search !== ''),        
        tap((search) => this.formSubmitted.emit(search))
      )
      .subscribe();    
  }
}
/* De esta manera se hace una petición al servidor por cada caractér que se ingresa */        
//.pipe(tap(res => this.formSubmitted.emit(res?.toString()))).subscribe(); /* toString: Para evitar un error que mostraba al solo poner emit(res) */

/** 
 *! Operadores y Decoradores:
 ** @Ouput: Decorador que permite que un componente hijo se pueda comunicar con un componente padre 
 ** map: Operador que permite modificar el elemento, en este caso se quitan los espacios
 ** debounceTime(): Operador que emite el valor despues de determinado tiempo
 ** distinctUntilChanged(): Operador que verifica si el valor que va a emitir no es igual al que a emitido 
 ** filter(): Operador que verifica si el valor no llega vacío 
 */