import project from "./project";

const toDo = (function() {
  
  class ToDo extends project.Project {
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

  return createToDo;
})()

export default toDo;