const projects = (function() {

  const projectArr = []; //Array to store all project Objects with their markup

  class Project {
    constructor(title, dueDate, priority) {
      this.title = title;
      this.dueDate = dueDate;
      this.priority = priority;
    }
      
    get(property) {
      return this[property];
    }
  
    set(property, value) {
      this[property] = value;
    }
  }  

  const createProject = (title, dueDate, priority) => {
    const project = new Project(title, dueDate, priority)
    return project;
  }
  
  function createProjectMarkup(project) {
    const projectMarkup = `
      <div class="project">
      <div class="project-header">
        <div class="space1">
          <input type="color" value="#ffffff" class="project-priority"/>
        </div>
        <div class="space2">
          <input type="text" class="project-title" name="name" required minlength="1" maxlength="15" placeholder="Project"/>
        </div>
        <div class="space3">
          <input type="date" class="project-date" required/>
        </div>
        <div class="space4">
          <button class="material-symbols-outlined">
            more_vert
          </button>
        </div>
      </div>
      <div class="project-content">
        <div class="project-toDo">
          To Do
          <ul>
            <li>project</li>
            <li>project</li>
            <li>project</li>
          </ul>
        </div>
        <div class="project-done">
          Done
          <ul>
            <li>project</li>
            <li>project</li>
            <li>project</li>
          </ul>
        </div>
      </div>
    </div>
    `;
    return projectMarkup;
  }

  function addProjectToArray(project, projectMarkup) {
    projectArr.push([project, projectMarkup]);
  }
  
  function addProject(title, dueDate, priority) {
    const newProject = createProject(title, dueDate, priority);
    const projectMarkup = createProjectMarkup(newProject);
    addProjectToArray(newProject, projectMarkup);
    const main = document.querySelector('main');
    main.innerHTML= '';
    projectArr.forEach(project => main.insertAdjacentHTML("beforeend", project[1]));
  }

  function editProject(e) {
    console.log(e.target);
  }

  function enterProyectSettings()  {
    if (projectArr.length) {
      const proyectSettingsBtn = document.getElementsByClassName("material-symbols-outlined");
      Array.from(proyectSettingsBtn).forEach(project => project.addEventListener("click", (e) => {
      editProject(e);
      }));
    } else {
      console.log("projectArr is empty")
    }
  }

  return {
    Project,
    addProject,
    enterProyectSettings
  };

})()
  
  export default projects;