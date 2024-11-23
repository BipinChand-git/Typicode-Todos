const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
const todoList = document.getElementById('todo-list');
const form = document.querySelector('#todo-form');

// Making a Get Request to fetch the data---
const getTodos = () => {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            data.forEach((todo) => addedTodoToDOM(todo))
        });
}

// creating and adding elements to the DOM--
const addedTodoToDOM = (todo) => {
    const div = document.createElement('div');
    const text = document.createTextNode(todo.title);
    div.appendChild(text);
    div.setAttribute('class' , 'todo');
    div.setAttribute('data-id', todo.id);

    if(todo.completed) {
        div.classList.add('done');
    }
                
    todoList.appendChild(div);
}

// Creating a Todo---
const createTodo = (e) => {
    e.preventDefault();
    
    const newTodo = {
        title : e.target.firstElementChild.value,
        completed : false,
    }

    PostRequest(newTodo);

    e.target.firstElementChild.value = '';
}

// Making a Post request to send data to server--
const PostRequest = (newTodo) => {
    fetch(apiUrl , {
        method : 'POST',
        body : JSON.stringify(newTodo),
        headers : {
            'Content-Type' : 'application/json',
        }
    })
        .then((response) => response.json())
        .then((data) => addedTodoToDOM(data));
}

const toggleCompleted = (e) => {
    if(e.target.classList.contains('todo')) {
        e.target.classList.toggle('done');
    }

    UpdateTodo(e.target.dataset.id , e.target.classList.contains('done'));
}

// Making a PUT request to change the data---
const UpdateTodo = (id, completed) => {
    fetch(`${apiUrl}/${id}`, {
        method : 'PUT',
        body : JSON.stringify({completed}),
        headers : {
            'Content-Type' : 'application/json'
        }
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
}

// Making a DELETE request to delete the todo---
const deleteTodo = (e) => {
    if(e.target.classList.contains('todo')) {
        const id = e.target.dataset.id;
        fetch(`${apiUrl}/${id}`, {
            method : 'DELETE',
        })
            .then((response) => response.json())
            .then(() => e.target.remove());
    }
}

// It will initialize first when the page loads---
const init = () =>  {
    document.addEventListener('DOMContentLoaded' , getTodos);
    form.addEventListener('submit', createTodo);
    todoList.addEventListener('click', toggleCompleted);
    todoList.addEventListener('dblclick', deleteTodo);
}
init();