import {projectsArray, localStorageFunctions} from "./localStorage.js"
import {ProjectFactory} from "./project.js"
import {taskFormFunctions} from "./taskForm.js"

const projectDOMFunctions = (() => {
    const createProjectDOM = (nameText) => {

        projectsArray.push(ProjectFactory(nameText)); 
        localStorageFunctions.saveNewData(); 

        const container = document.getElementById("projectsContainer"); // grabs container where all projects are stored

        const projectsContainer = document.createElement("div"); // makes a container for the entire project DOM
        projectsContainer.classList.add("projectsTaskContainer"); 
        projectsContainer.id = nameText + "projectDOM"; 
        container.appendChild(projectsContainer); 

        const taskAndTitleContainer = document.createElement("div");  // makes container that holds the project title and
        taskAndTitleContainer.classList.add("taskAndTitleContainer"); // task DOM to keep new task button on bottom of display
        projectsContainer.appendChild(taskAndTitleContainer); 

        const projectTitleContainer = document.createElement("div"); 
        projectTitleContainer.classList.add("projectTitleContainer"); 

        const projectTitle = document.createElement("div"); 
        projectTitle.classList.add("projectTitles");
        projectTitle.id = nameText + "projectTitle"; 
        projectTitle.innerHTML = nameText;

        const projectDeleteButton = document.createElement("div"); 
        projectDeleteButton.classList.add("projectDeleteButton"); 
        projectDeleteButton.innerHTML = "X"; 
        projectDeleteButton.addEventListener("click", confirmDelete);
        
        projectTitleContainer.appendChild(projectDeleteButton);
        projectTitleContainer.appendChild(projectTitle); 
        taskAndTitleContainer.appendChild(projectTitleContainer); 
        
        const projectTasksContainer = document.createElement("div"); 
        projectsContainer.appendChild(projectTasksContainer); 

        const createNewTaskButton = document.createElement("div"); // creates button that adds new task to task table
        createNewTaskButton.classList.add("createNewTaskButton"); 
        createNewTaskButton.innerHTML = "+ create a new task"; 
        createNewTaskButton.addEventListener("click", taskFormFunctions.createNewTaskForm); 
        projectsContainer.appendChild(createNewTaskButton); 

        createNewProjectListDiv(nameText); 
    }


    const createNewProjectListDiv = (nameText) => { // creates the project name on the list to the left
        const container = document.getElementById("listedProjects"); 
        const newDiv = document.createElement("div"); 
        newDiv.classList = "projectsOnList"; 
        newDiv.id = nameText + "ID"; 
        newDiv.innerHTML = nameText; 
        container.appendChild(newDiv);
    }

    const confirmDelete = (e) => {
        const projectName = e.target.parentNode.childNodes[1].innerHTML;
        const projectDiv = e.target.parentNode.parentNode.parentNode; 
        
        makeConfirmDeleteForm(projectName, projectDiv);
    }

    const makeConfirmDeleteForm = (projectName, projectDiv) => {
        const confirmDeleteContainer = document.createElement("div"); 
        confirmDeleteContainer.id = "confirmDeleteContainer"; 

        const confirmText = document.createElement("div"); 
        confirmText.id = "confirmText"; 
        confirmText.innerHTML = "Are you sure you want to delete this project?"; 

        const buttonContainer = document.createElement("div");
        buttonContainer.id = "buttonTaskContainer";

        const submitButton = document.createElement("div"); 
        submitButton.classList = "formButton"; 
        submitButton.id = "submitTaskButton"; 
        submitButton.innerHTML = "Submit"; 
        submitButton.addEventListener("click", 
                                      function() { deleteProject(projectName, projectDiv) }); 

        const cancelButton = document.createElement("div"); 
        cancelButton.classList = "formButton"; 
        cancelButton.id = "cancelTaskButton"; 
        cancelButton.innerHTML = "Cancel";
        cancelButton.addEventListener("click", removeConfirmDelete);
     
        buttonContainer.appendChild(submitButton); 
        buttonContainer.appendChild(cancelButton); 

        confirmDeleteContainer.appendChild(confirmText); 
        confirmDeleteContainer.appendChild(buttonContainer); 
        document.getElementById("mainContainer").appendChild(confirmDeleteContainer); 

        document.getElementById("overlay").style.display = "block";
    }

    const deleteProject = (projectName, projectDiv) => {
        for (let i = 0; i < projectsArray.length; i++) {   // removes selected project from projectsArray
            if (projectsArray[i].title == projectName) { 
                projectsArray.splice(i, 1); 
            }
        }
       
        document.getElementById(projectName + "ID").remove(); // removes project from list on left
        projectDiv.remove();                                  // removes project container from main div
        removeConfirmDelete(); 
        localStorageFunctions.saveNewData(); 
    }

    const removeConfirmDelete = () => {
        document.getElementById("confirmDeleteContainer").remove(); 
        document.getElementById("overlay").style.display = "none"; 
    }


return {
     createProjectDOM
    };
  })();

  export { projectDOMFunctions }
