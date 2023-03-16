const project = (function() {
  
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

    function createProjectTemplate(createProject) {
      
    }
  
    return {
      Project,
      createProject
    };
  })()
  
  export default project;