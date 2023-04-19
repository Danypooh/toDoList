import projects from "./project";

const toDos = (function() {

  const toDoArr = []; //Array to store all project Objects with their markup
  
  class ToDo extends projects.Project {
    constructor(title, dueDate, priority, project, description) {
      super(title, dueDate, priority);
      this.project = project;
      this.description = description;
    }
  }
  
  function createToDo(title, dueDate, priority, project, description) {
    const toDo = new ToDo(title, dueDate, priority, project, description)
    return toDo;
  }

  function createToDoMarkup() {
    const projectMarkup = `
      <div class="toDo">
        <div class="toDo-header">
          <div class="space1">
            <input type="color" value="#ffffff" class="toDo-priority"/>
          </div>
          <div class="space2">
            <input type="text" class="toDo-title" name="name" required minlength="1" maxlength="15" placeholder="toDo"/>
          </div>
          <div class="space2">
            <input type="text" class="toDo-project" name="project" required minlength="1" maxlength="15" placeholder="project"/>
          </div>
          <div class="space3">
            <input type="date" class="toDo-date" required/>
          </div>
          <div class="space4">
            <button class="material-symbols-outlined">
              more_vert
            </button>
          </div>
        </div>
        <div class="toDo-content">
          Content
        </div>
    </div>
    <div id="accept-cancel-box">
        <button id="accept-btn">Accept</button>
        <button id="cancel-btn">Cancel</button>
    </div>
    `;
    return projectMarkup;
  }

  function addToDo(title, dueDate, priority, project, description) {
    const newToDo = createToDo(title, dueDate, priority, project, description);
    const toDoMarkup = createToDoMarkup(newToDo);
    projects.addToArray(toDoArr, newToDo, toDoMarkup);
    const main = document.querySelector('main');
    main.innerHTML= '';
    toDoArr.forEach(toDo => main.insertAdjacentHTML("afterbegin", toDo[1]));
  }

  function initToDo(){
    addToDo();
  }

  return {
    initToDo
  }
})()

export default toDos;