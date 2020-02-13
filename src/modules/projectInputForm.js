import { projectDOMFunctions } from "./projectDOM.js";
import { localStorageFunctions } from "./localStorage.js";

const formFunctions = (() => {
    
    // generates input for for a new project
    const createForm = () => {
        const container = document.createElement("div"); 
        container.id = "formContainer"; 
        
        const formTitle = document.createElement("div"); 
        formTitle.id = "formTitle"; 
        formTitle.innerHTML = "New Project";

        const nameTitle = document.createElement("div"); 
        nameTitle.classList = "formSubtitle"; 
        nameTitle.innerHTML = "Project Name"; 

        const nameTextBox = document.createElement("input");
        nameTextBox.setAttribute("type", "text"); 
        nameTextBox.placeholder = "Type project name here...";
        nameTextBox.classList = "formTextBox"; 
        nameTextBox.id = "nameTextBox"; 

        const buttonContainer = document.createElement("div");
        buttonContainer.id = "buttonContainer";

        const submitButton = document.createElement("div"); 
        submitButton.classList = "formButton"; 
        submitButton.id = "submitButton"; 
        submitButton.innerHTML = "Submit"; 
        submitButton.addEventListener("click", inputChecker); 

        const cancelButton = document.createElement("div"); 
        cancelButton.classList = "formButton"; 
        cancelButton.id = "cancelButton"; 
        cancelButton.innerHTML = "Cancel";
        cancelButton.addEventListener("click", removeForm); 

        buttonContainer.appendChild(submitButton); 
        buttonContainer.appendChild(cancelButton); 

        container.appendChild(formTitle); 
        container.appendChild(nameTitle); 
        container.appendChild(nameTextBox); 
        container.appendChild(buttonContainer); 
        document.getElementById("mainContainer").appendChild(container); 
    }

    const showForm = () => {
        createForm();
        document.getElementById("overlay").style.display = "block";
    }

    const removeForm = () => {
        document.getElementById("formContainer").remove(); 
        document.getElementById("overlay").style.display = "none"; 
    }

    const inputChecker = () => {
        const nameText = document.getElementById("nameTextBox"); 

        if (nameText.value == "") {
            nameText.classList.add("textBoxError");
            nameText.placeholder = "Field cannot be empty...";
            return; 
        } else {
            projectDOMFunctions.createProjectDOM(nameText.value); 
            localStorageFunctions.saveNewData(); 
            removeForm(); 
        }
    }

    return {
     showForm
    };
  })();

  export {formFunctions};