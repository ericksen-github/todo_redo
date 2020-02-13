import {projectsArray, localStorageFunctions} from "./localStorage.js"

const tasKDOMFunctions = (() => {
    const createNewTaskDOM = (project, currentProjectDOM) => {
      
        const taskAndTitle = currentProjectDOM.childNodes[0]; // container for project title, table, and tasks
        createTable(taskAndTitle, project.title);
        
        const tableID = document.getElementById(project.title + "Table"); 
        const tbodyOfCurrent = tableID.childNodes[0].childNodes[3]; // table body of current project
        let taskHTML = ""; 
        
        for (let task of project.tasks) {

            taskHTML += `<tr><td>${task.name}</td>
                            <td>${task.description}</td>
                            <td>${task.dueDate}</td>
                            <td class = "priorityColumn">${task.priority}</td>
                            <td class = "editColumn"><div class = "editButton">Edit</div></td>
                            <td class = "removeOuter"><div class = "removeButtonNew">Remove</div></td>
                        </tr>
                    `;
        }
        tbodyOfCurrent.innerHTML = taskHTML; 
    
        createRemoveListeners(project.title); 
    }
        
    const createTable = (taskAndTitle, title) => {
        const tableChecker = document.getElementById(title + "Table");    // index only exists if table exists
        if (tableChecker){
            return; 
        }
 
        let tableHTML = ""; 
        const tableContainer = document.createElement("div"); 
        tableContainer.id = title + "Table";
    
        tableHTML += `<table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Due Date</th>
                                <th>Priority</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                    `;
    
        tableContainer.innerHTML = tableHTML; 
        taskAndTitle.appendChild(tableContainer); 
    }


    const createRemoveListeners = (projectTitle) => {
        document.querySelectorAll(".removeButtonNew").forEach((button) => {
            button.addEventListener("click", () => {
                removeTask(button.parentElement.parentElement, projectTitle); // passes same row as remove button
            })
        button.classList.replace("removeButtonNew","removeButton");   // changes classlist to avoid overlapping events
        })
    }

    const removeTask = (selectedRow, projectTitle) => {
     
        const taskName = selectedRow.children[0].innerHTML;
        const table = selectedRow.parentElement.parentElement;  // gets name of task on row
        table.deleteRow(selectedRow.rowIndex);                  // removes row from table
        let currentProject; 

        for (let i = 0; i < projectsArray.length; i++) {             // finds task name in projectsArray
            if (projectsArray[i].title == projectTitle) {   
                currentProject = projectsArray[i]; 
            }
        }

        for (let j = 0; j < currentProject.tasks.length; j++) {
            if (currentProject.tasks[j].name == taskName) {
                currentProject.tasks.splice(j, 1);    // and splices out task
            }
        }     
        localStorageFunctions.saveNewData(); 
    }

    
return {
    createNewTaskDOM
    };
    })();

    export { tasKDOMFunctions }
