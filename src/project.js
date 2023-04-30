import { doc } from "prettier";

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

  const addAcceptCancelBtns = () => {
    const accpetCancelBox = `
      <div id="accept-cancel-box">
        <button id="accept-btn">Accept</button>
        <button id="cancel-btn">Cancel</button>
      </div>
    `;
    const currentProject = document.querySelector(".project");
    currentProject.insertAdjacentHTML("afterend", accpetCancelBox);
  }

  const disableInputFields = () => {
    const projectPriority = document.querySelector(".project-priority");
    const projectTitle = document.querySelector(".project-title");
    const projectDate = document.querySelector(".project-date");
    
    projectPriority.disabled = true;
    projectTitle.disabled = true;
    projectDate.disabled = true;
  }

  const enableInputFields = () => {
    const projectPriority = document.querySelector(".project-priority");
    const projectTitle = document.querySelector(".project-title");
    const projectDate = document.querySelector(".project-date");

    projectPriority.disabled = false;
    projectTitle.disabled = false;
    projectDate.disabled = false;
  }

  function acceptEdit() {
    console.log("project edited");
    removeAcceptCancelBtns();
    disableInputFields();
  }

  function cancelEdit() {
    removeAcceptCancelBtns();
    disableInputFields();
  }

  function addListenerToAcceptCancelSettingsBtns() {
    const acceptBtn = document.getElementById("accept-btn");
    acceptBtn.addEventListener("click", acceptEdit);
    const cancelBtn = document.getElementById("cancel-btn");
    cancelBtn.addEventListener("click", cancelEdit);
  }

  const removeProject = () => {
    const project = document.querySelector(".project");
    const main = document.querySelector("main");
    main.removeChild(project);
    if (document.getElementById("accept-cancel-box"))
      removeAcceptCancelBtns();
  }

  function deleteProyectPopup() {
    if (window.confirm("delete project?")) {
      removeProject();
    }
  }

  function updateProjectsRenderization() {
    const main = document.querySelector('main');
    projectArr.forEach(project => main.insertAdjacentHTML("afterbegin", project[1]));
  }

  function editProyect() {
    enableInputFields();
    addAcceptCancelBtns();
    addListenerToAcceptCancelSettingsBtns();
  }

  function addListenerToSettingsBtns (edit, deletee) {
    edit.addEventListener("click", editProyect);
    deletee.addEventListener("click", deleteProyectPopup);
  }

  function openEditMenu(e) {
    console.log(e.target);

    const editMenu = `
    <div id="editMenu">
      <button id="edit">Edit</button>
      <button id="delete">Delete</button>
    </div>
    `;

    const header = document.querySelector(".project-header");

    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active');
      const insertedContent = document.getElementById("editMenu");
      insertedContent.parentNode.removeChild(insertedContent);
    } else {
      e.target.classList.add('active');
      header.insertAdjacentHTML("afterend", editMenu);
      const edit = document.getElementById("edit");
      const deletee = document.getElementById("delete");
      addListenerToSettingsBtns(edit, deletee);
    }
   
    // const projectPriority = document.querySelector(".project-priority");
    // const projectTitle = document.querySelector(".project-title");
    // const projectDate = document.querySelector(".project-date");

    // enableInputFields(projectPriority, projectTitle, projectDate);
  }

  function addListenerToProyectSettings()  {
    if (projectArr.length) {
      const proyectSettingsBtn = document.getElementsByClassName("material-symbols-outlined");
      Array.from(proyectSettingsBtn).forEach(project => project.addEventListener("click", (e) => {
      openEditMenu(e);
      }));
    } else {
      console.log("projectArr is empty")
    }
  }

  function configProject() {
    document.querySelector(".project-title").focus();
  }

  function acceptProject() {
    const projectPriority = document.querySelector(".project-priority");
    const projectTitle = document.querySelector(".project-title");
    const projectDate = document.querySelector(".project-date");

    const validation = projectValidation(projectTitle.value, projectDate.value, projectPriority.value);
    if (validation === 3) {
      const newProject = createProject(projectTitle.value, projectDate.value, projectPriority.value);
      removeAcceptCancelBtns();
      const projectMarkup = document.querySelector(".project");
      addToArray(projectArr, newProject, projectMarkup);
      disableInputFields();
      configProject();
      addListenerToProyectSettings();   
    } else {
      console.warn("please fill all the data");
    }
  }

  function addListenerToAcceptCancelProyectBtns() {
    const acceptBtn = document.getElementById("accept-btn");
    acceptBtn.addEventListener("click", acceptProject);
    const cancelBtn = document.getElementById("cancel-btn");
    cancelBtn.addEventListener("click", removeProject);
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
    addListenerToAcceptCancelProyectBtns();
  }

  return {
    Project,
    initProject,
    addToArray
  };

})()
  
  export default projects;