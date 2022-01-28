//import { Todo } from ".";
import {Todo} from './todo.class';

export class TodoList {

    constructor(){

        //this.todos = [];
        this.cargarLocalStorage();


    }

    nuevoTodo (todo) {
        this.todos.push(todo);
        this.guardarLocarStorage();
    }

    eliminarTodo (id){
        this.todos = this.todos.filter(todo => todo.id != id) //el filter toma el todo y luego el tdo.id y lo compara con el id, elimina ese id y regresa un nuevo arreglo sin ese id
        this.guardarLocarStorage();
    }

    marcarCompletado(id){
        for (const todo of this.todos){
            
            if(todo.id == id){
                todo.completado = !todo.completado;
                this.guardarLocarStorage();
                break;
            }
        }
    }

    eliminarCompletados(){
        this.todos = this.todos.filter(todo => !todo.completado)
        this.guardarLocarStorage();
    }
//la siguiente linea toma el arreglo de todos y lo convierte en un json para almacenar en el localStorage
    guardarLocarStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }
//las siguietnes lines toman el JSON y los vuelven a cargar para asi ser persistente ante un refresh de la pag o un cierre y apertura del navegador
    cargarLocalStorage(){
        //operador ternario, lo mismo que if, else
        this.todos = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];

        //el map permite barrer todos los elementos del arreglo y retornar un array con os elementos de la funicon llamada
        this.todos = this.todos.map(obj => Todo.fromJson(obj));
    }
}