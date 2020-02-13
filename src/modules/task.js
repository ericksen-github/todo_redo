const TaskFactory = (name, description, dueDate, priority) => {
    return {
        name,
        description,
        dueDate, 
        priority
    }; 
}

export {TaskFactory};