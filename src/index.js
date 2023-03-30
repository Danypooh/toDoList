import "./style.css";
import projects from "./project";

const addBtn = document.getElementById("add-btn");
const currentSpace = document.getElementById("current-space");
switch (currentSpace.value) {
  case "Home": addBtn.addEventListener("click", () => {
                 projects.addProject();  
                 projects.configProject();
                 projects.enterProyectSettings();
               })
               break;
  case "Today": 
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
