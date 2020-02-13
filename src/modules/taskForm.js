import { projectsArray, localStorageFunctions } from "./localStorage";
import {TaskFactory} from "./task.js"; 
import {tasKDOMFunctions} from "./taskDOM.js"; 

const taskFormFunctions = (() => {
    let currentProjectDOM; 

    const createNewTaskForm = (e) => {
        currentProjectDOM = e.target.parentNode.childNodes[0]; 

        document.getElementById("overlay").style.display = "block"; 
        
        const container = document.createElement("div"); 
        container.id = "taskFormContainer"; 
        
        const formTitle = document.createElement("div"); 
        formTitle.id = "taskFormTitle"; 
        formTitle.innerHTML = "New Task";

        const nameTitle = document.createElement("div"); 
        nameTitle.classList = "formTaskSubtitle"; 
        nameTitle.innerHTML = "Task Name"; 

        const nameTextBox = document.createElement("input")
        nameTextBox.setAttribute("type", "text"); 
        nameTextBox.placeholder = "Type take name here...";
        nameTextBox.classList = "formTextBox"; 
        nameTextBox.id = "nameTaskTextBox"; 

        const descriptionTitle = document.createElement("div"); 
        descriptionTitle.classList = "formTaskSubtitle"; 
        descriptionTitle.innerHTML = "Description"; 

        const descriptionTextBox = document.createElement("input")
        descriptionTextBox.setAttribute("type", "text"); 
        descriptionTextBox.placeholder = "Type description here (optional)";
        descriptionTextBox.classList = "formTextBox"; 
        descriptionTextBox.id = "descriptionTaskTextBox"; 

        const datePrioTitleContainer = document.createElement("div"); 
        datePrioTitleContainer.id = "datePrioTitleContainer"; 

        const datePrioItemContainer = document.createElement("div"); 
        datePrioItemContainer.id = "datePrioItemContainer"; 

        const taskDateTitle = document.createElement("div"); 
        taskDateTitle.classList = "formTaskSubtitle"; 
        taskDateTitle.id = "taskDateTitle"; 
        taskDateTitle.innerHTML = "Due Date"; 

        const taskDate = document.createElement("input");
        taskDate.setAttribute("type", "date"); 
        taskDate.id = "taskDate"; 

        const taskPriorityTitle = document.createElement("div"); 
        taskPriorityTitle.classList = "formTaskSubtitle"; 
        taskPriorityTitle.id = "taskPriorityTitle"; 
        taskPriorityTitle.innerHTML = "Priority"; 

        const taskPriority = document.createElement("select"); 
        const optionsArray = ["High", "Medium", "Low"]; 
        taskPriority.id = "taskPriority"; 
        for (let i = 0; i < optionsArray.length; i++) {
            let option = document.createElement("option"); 
            option.value = optionsArray[i]; 
            option.text = optionsArray[i]; 
            taskPriority.appendChild(option); 
        }

        const buttonContainer = document.createElement("div");
        buttonContainer.id = "buttonTaskContainer";

        const submitButton = document.createElement("div"); 
        submitButton.classList = "formButton"; 
        submitButton.id = "submitTaskButton"; 
        submitButton.innerHTML = "Submit"; 
        submitButton.addEventListener("click", inputTaskChecker); 

        const cancelButton = document.createElement("div"); 
        cancelButton.classList = "formButton"; 
        cancelButton.id = "cancelTaskButton"; 
        cancelButton.innerHTML = "Cancel";
        cancelButton.addEventListener("click", removeForm);
     
        buttonContainer.appendChild(submitButton); 
        buttonContainer.appendChild(cancelButton); 

        container.appendChild(formTitle); 
        container.appendChild(nameTitle); 
        container.appendChild(nameTextBox); 
        container.appendChild(descriptionTitle); 
        container.appendChild(descriptionTextBox); 
        datePrioTitleContainer.appendChild(taskDateTitle); 
        datePrioTitleContainer.appendChild(taskPriorityTitle); 
        container.appendChild(datePrioTitleContainer); 
        datePrioItemContainer.appendChild(taskDate); 
        datePrioItemContainer.appendChild(taskPriority); 
        container.appendChild(datePrioItemContainer); 
        container.appendChild(buttonContainer); 
        document.getElementById("mainContainer").appendChild(container); 
    }

    const getTaskFromForm = () => {
        const currentProjectTitle = currentProjectDOM.childNodes[0]. // is location of title text of
        childNodes[1].innerHTML;                                     // project in DOM of current container

        const taskName = document.getElementById("nameTaskTextBox").value;
        const taskDescription = document.getElementById("descriptionTaskTextBox").value;
        const taskDate = document.getElementById("taskDate").value; 
        const taskPriority = document.getElementById("taskPriority").value; 
        const newTask = TaskFactory(taskName, taskDescription, taskDate, taskPriority);

        addNewTask(newTask, currentProjectTitle); 
    }

    const addNewTask = (newTask, currentProjectTitle) => {
   
        let indexOfProject; 
        currentProjectDOM = document.getElementById(currentProjectTitle + "projectDOM");

        for (let i = 0; i < projectsArray.length; i++) {
            if (projectsArray[i].title == currentProjectTitle){
                indexOfProject = i; 
            }
        }
        
        projectsArray[indexOfProject].tasks.push(newTask);
        console.log(projectsArray[indexOfProject]);
        tasKDOMFunctions.createNewTaskDOM(projectsArray[indexOfProject], currentProjectDOM); 
        localStorageFunctions.saveNewData(); 
    }

    const removeForm = () => {
        document.getElementById("taskFormContainer").remove(); 
        document.getElementById("overlay").style.display = "none"; 
    }

    const inputTaskChecker = () => {
        const nameText = document.getElementById("nameTaskTextBox"); 

        if (nameText.value == "") {
            nameText.classList.add("textBoxError");
            nameText.placeholder = "Field cannot be empty...";
            return; 
        } else {
            getTaskFromForm();  
            removeForm(); 
        }
    }
return {
     createNewTaskForm,
     addNewTask
    };
  })();

  export { taskFormFunctions };
