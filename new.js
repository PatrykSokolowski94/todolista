let $todoInput; // miejsce, gdzie użytkownik wpisuje treść
let $alertInfo; // info o braku zadań / konieczności dodania tekstu
let $addBtn; // przycisk ADD - dodaje nowe elementy do listy
let $ulList; // nasza lista zadań, tagi <ul></ul>
let $newTask; // nowo dodany LI, nowe zadanie
let $allTasks; // lista wszystkich dodanych LI
let $idNumber = 0; // ID dodawane do każdego nowego zadania
let $popup; //pobrany popup
let $popupInfo; // alert w popupie, jak się doda pusty tekst
let $editedTodo; // edytowany Todo
let $popupInput; //tekst wpisywany w inputa w popup'ie
let $addPopupBtn; // przycisk "zatwierdź" w popup'ie
let $closeTodoBtn; //przycisk od zamykania popup'a

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todo-input');
    $alertInfo = document.querySelector('.alert-info');
    $addBtn = document.querySelector('.add-btn');
    $ulList = document.querySelector('.todo-list ul');
    $allTasks = document.getElementsByTagName('li');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popup-info');
    $popupInput = document.querySelector('.popup-input');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
}

const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', checkInput);
    $ulList.addEventListener('click', checkClick);
    $addPopupBtn.addEventListener('click', changeToDo);
    $closeTodoBtn.addEventListener('click', closePopup);
}

const addNewTask = () => {
    $newTask = document.createElement('li');
    $newTask.setAttribute('id', $idNumber);
    $newTask.innerText = $todoInput.value;
    $ulList.appendChild($newTask)
    $idNumber++
    $alertInfo.textContent = '';
    $todoInput.value = '';

    createTools();
}

const checkInput = () => {
    if ($todoInput.value !== '') {
        addNewTask();
    } else {
        $alertInfo.textContent = 'Musisz wprowadzić jakąś treść';
    }
};


const createTools = () => {
    const toolsPanel = document.createElement('div')
    toolsPanel.classList.add('tools')
    $newTask.appendChild(toolsPanel)


    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = `<i class="fas fa-check"></i>`;

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerHTML = `EDIT`;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = `<i class="fas fa-times"></i>`;

    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);

    console.log($newTask);

}



const editTask = e => {
    $popup.style.display = "flex";

    $editedTodo = e.target.closest('li');

    $popupInput.value = $editedTodo.firstChild.textContent;

    console.log($editedTodo.firstChild);
}


const changeToDo = () =>{
    if ($popupInput.value !== '') {
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = "none";
        $popupInput.value = '';
        $popupInfo.innerText = ''

    }
    else {
        $popupInfo.innerText = 'Musisz podać jakąś treść !'
    }
}

const closePopup = () =>{
    $popup.style.display = "none";
    $popupInput.value = '';
    $popupInfo.innerText = ''
}

const deleteTask = e => {
    const taskToDelete = e.target.closest('li');
    $ulList.removeChild(taskToDelete)

    if ($allTasks.length === 0) {
        $alertInfo.textContent = 'Brak zadań na liście!';
    }
}

const checkClick = e => {
    if (e.target.classList.value !== '') {
        if (e.target.closest('button').classList.contains('complete')) {
          
            e.target.closest('li').classList.toggle('completed')
            e.target.closest('button').classList.toggle('completed')

        } else if (e.target.closest('button').classList.contains('edit')) {
          
            editTask(e)


        } else if (e.target.closest('button').classList.contains('delete')) {
            deleteTask(e)
        }
    }
}


document.addEventListener('DOMContentLoaded', main);