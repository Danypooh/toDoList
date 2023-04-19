const projects = (function() {

  //Array to store all project Objects with their markup
  const projectArr = [];

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
  
  function createProjectMarkup() {
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
    <div id="accept-cancel-box">
        <button id="accept-btn">Accept</button>
        <button id="cancel-btn">Cancel</button>
    </div>
    `;
    return projectMarkup;
  }

  function addToArray(array, project, projectMarkup) {
    array.push([project, projectMarkup]);
  }

  function renderProject() {
    const main = document.querySelector("main");
    main.insertAdjacentHTML("afterbegin", createProjectMarkup());
  }
  
  function projectValidation(projectTitle, projectDate, projectPriority) {
    let validation = 0;
    if (projectPriority !== "#ffffff") {
      console.log("priority validated");
      validation += 1;
      if (projectTitle !== "") {
        console.log("title validated");
        validation += 1;
        if (projectDate !== "") {
          console.log("date validated");
          validation += 1;
        } else {
          console.warn("please select a date");
        }
      } else {
        console.warn("please select a title");
      }
    } else {
      console.warn("please select a priority");
    }
    return validation;
  }

  const removeAcceptCancelBtns = () => {
    const acceptDeclineBtns = document.getElementById("accept-cancel-box");
    const main = document.querySelector("main");
    main.removeChild(acceptDeclineBtns);
  }

  function updateProjectsRenderization() {
    const main = document.querySelector('main');
    projectArr.forEach(project => main.insertAdjacentHTML("afterbegin", project[1]));
  }

  function acceptProject() {
    const projectPriority = document.querySelector(".project-priority").value;
    const projectTitle = document.querySelector(".project-title").value;
    const projectDate = document.querySelector(".project-date").value;

    const validation = projectValidation(projectTitle, projectDate, projectPriority);
    if (validation === 3) {
      const newProject = createProject(projectTitle, projectDate, projectPriority);
      removeAcceptCancelBtns();
      const projectMarkup = document.querySelector(".project");
      addToArray(projectArr, newProject, projectMarkup);
    } else {
      console.warn("please fill all the data");
    }
  }

  const removeProject = () => {
    const project = document.querySelector(".project");
    const main = document.querySelector("main");
    main.removeChild(project);
    removeAcceptCancelBtns();
  }

  function addListenerToAcceptCancelBtns() {
    const acceptBtn = document.getElementById("accept-btn");
    acceptBtn.addEventListener("click", acceptProject);
    const cancelBtn = document.getElementById("cancel-btn");
    cancelBtn.addEventListener("click", removeProject);
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

  function configProject() {
    // document.querySelector(".project-priority").click();
    document.querySelector(".project-title").focus();
  }

  function checkForSingleProjectCreation() {
    if (document.getElementById("accept-cancel-box")) {
      return true;
    }
      return false;
  }

  function initProject() {
    if (checkForSingleProjectCreation()) {
      return console.warn("cannot create two projects at the same time");
    }
    renderProject();
    addListenerToAcceptCancelBtns();
    configProject();
    enterProyectSettings();   
  }

  return {
    Project,
    initProject,
    addToArray
  };

})()
  
  export default projects;