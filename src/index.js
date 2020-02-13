import { localStorageFunctions } from "./modules/localStorage.js";
import { formFunctions } from "./modules/projectInputForm.js";

if (localStorageFunctions.storageAvailable("localStorage")) {
    localStorageFunctions.populateStorage(); 
}

document.getElementById("createNewProject").addEventListener("click", formFunctions.showForm); 