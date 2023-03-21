import "./style.css";
import projects from "./project";

const addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", () => {
    projects.addProject("Omazing Project", "13/03/2023", "high");
})