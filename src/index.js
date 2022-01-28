import './styles.css';

import {Todo, TodoList} from './classes';
import { crearTodoHtml } from './js/componentes';
//la linea anterior importa todas las clases desde el archivo indexedDB.js en la carpeta class
// import {Todo} from './classes/todo.class';
// import { TodoList } from './classes/todo-list.class';




export const todoList = new TodoList();


//la siguiente linea tambien se puede escribir asi: todoList.todos.forEach(todo => crearTodoHtml(todo));:
todoList.todos.forEach(crearTodoHtml);

console.log('todos', todoList.todos);
