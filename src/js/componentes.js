import { Todo } from "../classes";
import {todoList} from "../index";

//referencias en html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltro = document.querySelectorAll('.filtro');




export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class= "${ (todo.completado)? 'completed' : '' }" data-id="${ todo.id }">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado)? 'checked': '' }>
			<label>${ todo.tarea }</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
};



//Eventos//

//el eyup es cuando se presiona enter (suelta la tecla), ademas event nos dice que tecla presionó
txtInput.addEventListener('keyup', (event) =>{
    if(event.keyCode === 13 & txtInput.value.length > 0){
        
        
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo (nuevoTodo);

        crearTodoHtml(nuevoTodo);

        txtInput.value = '';
    }
});


divTodoList.addEventListener('click', (event) => {
    // el event.target.localName nos dice donde hizo click el mouse
    const nombreElemento = event.target.localName; //puede ser un imput, label, button

    const todoElemento = event.target.parentElement.parentElement; //nos muestra el elemento html

    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')){//si hace click en el check
        todoList.marcarCompletado(todoId);  //le envia el id a la classe para camviar el estao
        todoElemento.classList.toggle('completed'); //pone el tachado sebre el nombre

    }

    else if (nombreElemento.includes('button')){ //elimina elemento de todo marcado con x
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento); //elimina la ref en el html
    }


});

btnBorrar.addEventListener('click', ()=>{

    todoList.eliminarCompletados();
    //se barreran los indices desde abajo hacia arriba, ya que al eliminar no se alterna el valor de los indices de arriba
    for (let i = divTodoList.children.length - 1; i>= 0 ; i--){
        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }

});


ulFiltros.addEventListener('click', (event) =>{
    
    const filtro = event.target.text;
    if(!filtro){
        return;
    }

    anchorFiltro.forEach(elem => elem.classList.remove('Selected'));
    event.target.classList.add('selected');


    for(const elemento of divTodoList.children){
        //hiden es una clase del css
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed'); //se esta preguntand si el elemento contiene el completed

        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
});
