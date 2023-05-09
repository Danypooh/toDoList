import "./style.css";
import projects from "./project";
import toDos from "./toDo";
const {format} = require('date-fns');

const date = document.getElementById("today-date");
const today = format(new Date(),'dd.MM.yyyy');
date.innerHTML = `Today: ${today}`;

const addBtn = document.getElementById("add-btn");
const currentSpace = document.getElementById("current-space");
addBtn.addEventListener("click", projects.initProject);

function onChange(e) {
  const lastEvent = e.target.value;
  switch (lastEvent) {
    case "Home": addBtn.removeEventListener("click", toDos.initToDo);
                 addBtn.addEventListener("click", projects.initProject);
                 break;
    case "Today": addBtn.removeEventListener("click", projects.initProject);
                  addBtn.addEventListener("click", toDos.initToDo)
                 break;
    case "Week": 
                 break;
    case "Projects": 
                 break;
    case "Notes": 
                 break;
    default: console.log("default case")
             break;
  }
}
currentSpace.addEventListener("change", (e) => onChange(e));

// if (document.getElementById("accept-btn") !== null) {
//   const acceptBtn = document.getElementById("accept-btn");
//   acceptBtn.addEventListener("click", )
// }