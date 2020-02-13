import { projectDOMFunctions } from "./projectDOM.js";
import { taskFormFunctions } from "./taskForm.js";

let projectsArray = [];

const localStorageFunctions = (() => {
    const storageAvailable = (type) => { // checks to see if browswer offers support for local storage
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }

    const populateStorage = () => {
        if(!localStorage.getItem('savedProject')) {
            
        } else {
            const loadedArray = JSON.parse(localStorage.getItem('savedProject'));
            loadExistingStorage(loadedArray); 
        }
        
    }

    const loadExistingStorage = (loadedArray) => {
        for (let i = 0; i < loadedArray.length; i++) {
            projectDOMFunctions.createProjectDOM(loadedArray[i].title); 
            if (loadedArray[i].tasks.length > 0) {
                for (let j = 0; j < loadedArray[i].tasks.length; j++) {
                    taskFormFunctions.addNewTask(loadedArray[i].tasks[j], loadedArray[i].title); 
                }
            }
        }
    }

    const saveNewData = () => {
        localStorage.setItem('savedProject', JSON.stringify(projectsArray));
    }

return {
    storageAvailable,
    populateStorage,
    saveNewData
   };
 })();

 export { localStorageFunctions, projectsArray };
